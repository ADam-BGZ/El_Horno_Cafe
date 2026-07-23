import asyncio, sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
from playwright.async_api import async_playwright

SEARCH = "El Horno Café Restaurant Tanger Maroc"

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        ctx = await browser.new_context(viewport={"width": 1400, "height": 900}, locale="fr-FR",
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36")
        page = await ctx.new_page()
        page.set_default_timeout(30000)

        await page.goto("https://www.google.com/maps", wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(8000)
        for sel in ['button[aria-label="Tout refuser"]','button[aria-label="Reject all"]','button[aria-label="Tout accepter"]']:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=3000): await btn.click(); await page.wait_for_timeout(1500); break
            except: pass
        await page.wait_for_timeout(3000)
        search = page.locator('input[role="combobox"]')
        await search.wait_for(timeout=15000)
        await search.click(); await search.fill(SEARCH); await page.keyboard.press("Enter"); await page.wait_for_timeout(8000)
        horno_link = page.locator('a[aria-label*="Horno"]').first
        await horno_link.wait_for(timeout=10000); await horno_link.click(); await page.wait_for_timeout(8000)

        pres = page.locator('[role="tab"]').filter(has_text="Présentation")
        if await pres.count() > 0: await pres.first.click(); await page.wait_for_timeout(3000)
        for _ in range(12): await page.evaluate("window.scrollBy(0, 400)"); await page.wait_for_timeout(600)
        for _ in range(5):
            try:
                vp = page.locator('button:has-text("Voir plus")')
                if await vp.first.is_visible(timeout=1000): await vp.first.click(); await page.wait_for_timeout(1500)
            except: break

        # Find the "Menu et plats populaires" h2, then get its parent container's HTML
        result = await page.evaluate("""() => {
            function findH2(root, depth) {
                if (depth > 25) return null;
                if (root.shadowRoot) {
                    const r = findH2(root.shadowRoot, depth + 1);
                    if (r) return r;
                }
                for (const child of root.childNodes) {
                    if (child.nodeType === 1) {
                        if (child.tagName === 'H2' && child.innerText?.includes('Menu et plats')) {
                            return child;
                        }
                        const r = findH2(child, depth + 1);
                        if (r) return r;
                    }
                }
                return null;
            }
            const h2 = findH2(document.body, 0);
            if (!h2) return null;

            // Get the scrollable container that holds the dish cards
            let container = h2.parentElement;
            for (let i = 0; i < 10; i++) {
                if (!container) break;
                const s = getComputedStyle(container);
                if (s.overflowX === 'auto' || s.overflowX === 'scroll' || container.scrollWidth > container.clientWidth + 50) {
                    break;
                }
                container = container.parentElement;
            }
            if (!container) container = h2.parentElement?.parentElement;

            // Now extract all dish cards from this container
            const cards = [];
            const allImgs = container.querySelectorAll('img');
            allImgs.forEach(img => {
                const src = img.src || '';
                if (src.includes('googleusercontent') || src.includes('lh3')) {
                    const rect = img.getBoundingClientRect();
                    if (rect.width > 50) {
                        // Walk up to find the card container and the name
                        let card = img.parentElement;
                        let name = null;
                        let desc = null;
                        for (let j = 0; j < 10; j++) {
                            if (!card) break;
                            const heading = card.querySelector('[role="heading"], .qBF1Pd');
                            if (heading) { name = heading.innerText?.trim(); break; }
                            card = card.parentElement;
                        }
                        cards.push({
                            src: src,
                            name: name,
                            x: Math.round(rect.x), y: Math.round(rect.y),
                            w: Math.round(rect.width), h: Math.round(rect.height)
                        });
                    }
                }
            });
            return cards;
        }""")

        print(f"Cartes trouvées: {len(result) if result else 0}")
        if result:
            for c in result:
                print(f"  {json.dumps(c, ensure_ascii=False)}")

        # Alternative: dump the HTML around the menu section
        html_around = await page.evaluate("""() => {
            function findH2(root, depth) {
                if (depth > 25) return null;
                if (root.shadowRoot) { const r = findH2(root.shadowRoot, depth+1); if (r) return r; }
                for (const child of root.childNodes) {
                    if (child.nodeType === 1) {
                        if (child.tagName === 'H2' && child.innerText?.includes('Menu et plats')) return child;
                        const r = findH2(child, depth+1); if (r) return r;
                    }
                }
                return null;
            }
            const h2 = findH2(document.body, 0);
            if (!h2) return 'H2 NOT FOUND';
            let section = h2.parentElement;
            for (let i = 0; i < 3; i++) {
                if (section?.parentElement) section = section.parentElement;
            }
            return section ? section.innerHTML.substring(0, 15000) : 'NO SECTION';
        }""")
        with open("menu_section.html", "w", encoding="utf-8") as f:
            f.write(html_around)
        print(f"\nHTML section sauvegardé: {len(html_around)} chars")

        await browser.close()

asyncio.run(main())
