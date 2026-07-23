import asyncio, sys, io, json, re, os, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
from playwright.async_api import async_playwright

SEARCH = "El Horno Café Restaurant Tanger Maroc"
CATEGORIES = ["Sandwichs", "Pasticcio", "Calzone", "Patisserie", "Couscous", "Burger", "Pizza"]
OUTPUT_DIR = r"C:\Users\ASUS\Downloads\El Horno  Café\photos"

GET_ALL_TEXT_JS = """() => {
    function t(r,d){let s='';if(d>25)return s;if(r.shadowRoot)s+=t(r.shadowRoot,d+1);for(const c of r.childNodes){if(c.nodeType===3)s+=c.textContent;else if(c.nodeType===1){s+=t(c,d+1);if(c.tagName==='DIV'||c.tagName==='P'||c.tagName==='BR')s+='\\n';}}return s;}
    return t(document.body,0);
}"""

def parse_menu(text):
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    price_re = re.compile(r"^(\d+[.,]\d{2})\s*MAD$")
    skip = {"Présentation","Menu","Avis","À propos","Itinéraires","Enregistrer","Enregistré","Récents","Obtenir l'appli","Partager","Se connecter","Voir plus","Réduire le panneau latéral","Maroc","Conditions d'utilisation","Confidentialité","Envoyer des commentaires sur le produit","Voir les photos","Ajouter des photos/vidéos","Suggérer une modification","Rédiger un avis","Plus d'avis","Trier","Tout","Carte","Haut de page","Applications Google"}
    cats = set(CATEGORIES)
    prices = [(i, line) for i, line in enumerate(lines) if price_re.match(line)]
    items = []
    for pi, price in prices:
        cands = []
        for j in range(pi-1, max(0, pi-8), -1):
            l = lines[j]
            if price_re.match(l) or l in cats or l in skip: break
            cands.append(l)
        cands.reverse()
        name = cands[0] if cands else None
        desc = ", ".join(cands[1:]) if len(cands) >= 2 else None
        if name and name not in cats and name not in skip:
            items.append({"name": name, "description": desc, "price": price, "image_url": None})
    return items

def big_url(url): return re.sub(r'=w\d+-h\d+', '=w800-h800', url)

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        ctx = await browser.new_context(viewport={"width":1400,"height":900}, locale="fr-FR",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36")
        page = await ctx.new_page()
        page.set_default_timeout(30000)

        print("Navigation...")
        try:
            await page.goto("https://www.google.com/maps", wait_until="domcontentloaded", timeout=60000)
        except: pass
        await page.wait_for_timeout(8000)
        try:
            for s in ['button[aria-label="Tout refuser"]','button[aria-label="Reject all"]','button[aria-label="Tout accepter"]']:
                try:
                    b=page.locator(s).first
                    if await b.is_visible(timeout=3000): await b.click(); await page.wait_for_timeout(1500); break
                except: pass
        except: pass
        await page.wait_for_timeout(3000)

        print("Recherche...")
        try:
            search=page.locator('input[role="combobox"]')
            await search.wait_for(timeout=15000); await search.click(); await search.fill(SEARCH)
            await page.keyboard.press("Enter"); await page.wait_for_timeout(8000)
        except:
            await page.goto("https://www.google.com/maps/search/El+Horno+Caf%C3%A9+Restaurant+Tanger+Maroc/@35.5888699,-5.3437639,17z", wait_until="domcontentloaded", timeout=60000)
            await page.wait_for_timeout(8000)

        print("Ouverture fiche restaurant...")
        try:
            await page.locator('a[aria-label*="Horno"]').first.click()
        except:
            await page.locator('a[href*="place/El+Horno"]').first.click()
        await page.wait_for_timeout(8000)
        print("Restaurant trouvé !")

        # === PART 1: Get dish photos from Présentation ===
        print("\nExtraction des photos de plats...")
        try:
            await page.locator('[role="tab"]').filter(has_text="Présentation").first.click()
        except: pass
        await page.wait_for_timeout(3000)
        for _ in range(12): await page.evaluate("window.scrollBy(0,400)"); await page.wait_for_timeout(500)
        for _ in range(5):
            try:
                vp=page.locator('button:has-text("Voir plus")')
                if await vp.first.is_visible(timeout=1000): await vp.first.click(); await page.wait_for_timeout(1500)
            except: break

        # Extract text items from the "Menu et plats populaires" section
        section_text = await page.evaluate("""() => {
            function t(r,d){let s='';if(d>25)return s;if(r.shadowRoot)s+=t(r.shadowRoot,d+1);for(const c of r.childNodes){if(c.nodeType===3)s+=c.textContent;else if(c.nodeType===1){s+=t(c,d+1);if(c.tagName==='DIV'||c.tagName==='P'||c.tagName==='BR')s+='\\n';}}return s;}
            return t(document.body,0);
        }""")

        # Find the section and extract dish names between "Menu et plats populaires" and the end
        lines = section_text.split('\n')
        section_idx = -1
        for i, l in enumerate(lines):
            if 'Menu et plats populaires' in l:
                section_idx = i
                break

        dish_names = []
        if section_idx >= 0:
            for i in range(section_idx+1, min(len(lines), section_idx+50)):
                t = lines[i].strip()
                if t and len(t) > 1 and len(t) < 60 and t != 'Voir plus' and t != 'Menu':
                    if not any(kw in t for kw in ['Avis','À propos','Itinéraire','Enregistrer','Se connecter','Partager','obtenir','appli','Conditions','Confidentialité','commentaires','Maroc','Images','Calques','Google','Applications','Envoyer','étoile','avis','MAD','Ouvert','Ferme','Repas','Drive','Livraison','Profil','Tout','plus d','page','glisser','Supprimer','Indisponible','Réduire','Fermer','Connexion','Street','Satellite','Transports','Trafic','Vélo','Relief','Feux','Qualité','Temps','Mesurer','Zoom','Position','Haut','Rechercher','défaut','Globe','Libellés','Données','ajouter','Rédiger','Suggérer','Trier','Carte','Site Web','06 66','HMQ5','Restaurant ·','Café ·','Pizza ·','Al wilaya','Tétouan','Tanger','Ouvert actuellement','Ferme à']):
                        dish_names.append(t)
        print(f"  Plats identifiés: {dish_names}")

        # Get all food images by position
        food_imgs = await page.evaluate("""() => {
            const r=[];
            function g(root,d){if(d>25)return;if(root.shadowRoot)g(root.shadowRoot,d+1);for(const c of root.childNodes){
                if(c.nodeType!==1)continue;const rect=c.getBoundingClientRect();
                if(rect.y>1500&&rect.width>80&&rect.height>80&&rect.height<300&&(c.tagName==='IMG')){
                    const s=c.src||'';if(s.includes('googleusercontent')||s.includes('lh3'))r.push({src:s,x:Math.round(rect.x),y:Math.round(rect.y),w:Math.round(rect.width),h:Math.round(rect.height)});
                }g(c,d+1);}
            }g(document.body,0);
            r.sort((a,b)=>a.y-b.y||a.x-b.x);
            const seen=new Set();return r.filter(i=>{const k=i.src.substring(0,80);if(seen.has(k))return false;seen.add(k);return true;});
        }""")
        print(f"  {len(food_imgs)} images de plats")

        # Associate names with images by x-position order
        photo_map = {}
        for i, name in enumerate(dish_names):
            if i < len(food_imgs):
                photo_map[name] = big_url(food_imgs[i]['src'])
                print(f"    {name} -> image {i+1}")

        # === PART 2: Extract full menu from categories ===
        print("\nExtraction du menu par catégories...")
        try:
            await page.locator('button:has-text("Menu")').first.click()
        except: pass
        await page.wait_for_timeout(5000)

        menu_data = {}
        all_items = []
        for cat in CATEGORIES:
            cb = page.locator(f'button:has-text("{cat}")').first
            if not await cb.is_visible(timeout=3000): continue
            await cb.click(); await page.wait_for_timeout(3000)
            for _ in range(3):
                try:
                    vp=page.locator('button:has-text("Voir plus")')
                    if await vp.first.is_visible(timeout=800): await vp.first.click(); await page.wait_for_timeout(1000)
                except: pass
            ft = await page.evaluate(GET_ALL_TEXT_JS)
            items = parse_menu(ft)
            for item in items:
                for name, src in photo_map.items():
                    if name.lower() in item['name'].lower() or item['name'].lower() in name.lower() or any(w.lower() in item['name'].lower() for w in name.split() if len(w)>3):
                        item['image_url'] = src
                        break
            menu_data[cat] = items
            all_items.extend([(cat,item) for item in items])
            print(f"  {cat}: {len(items)} produits")
            await cb.click(); await page.wait_for_timeout(1500)

        # === PART 3: Download images ===
        print(f"\nTéléchargement des images...")
        dl = 0
        for cat, item in all_items:
            if item['image_url']:
                safe = re.sub(r'[^\w\s-]','',item['name']).strip().replace(' ','_')
                path = os.path.join(OUTPUT_DIR, f"{safe}.jpg")
                try:
                    req = urllib.request.Request(item['image_url'], headers={'User-Agent':'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        with open(path,'wb') as f: f.write(resp.read())
                    item['local_image'] = path; dl += 1
                    print(f"  [OK] {item['name']}")
                except Exception as e:
                    print(f"  [ERR] {item['name']}: {e}")

        # Save
        with open("menu.json","w",encoding="utf-8") as f:
            json.dump(menu_data, f, ensure_ascii=False, indent=2)
        with_img = sum(1 for _,i in all_items if i['image_url'])
        print(f"\nTerminé ! {len(all_items)} produits, {with_img} avec image, {dl} téléchargées")
        await browser.close()

if __name__=="__main__": asyncio.run(main())
