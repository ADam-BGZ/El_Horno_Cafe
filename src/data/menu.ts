import menuData from '../../menu.json';

export interface MenuItem {
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
}

export type MenuCategory = Record<string, MenuItem[]>;

export interface ProcessedMenuItem {
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  hasImage: boolean;
}

export interface ProcessedCategory {
  name: string;
  slug: string;
  count: number;
  items: ProcessedMenuItem[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFallbackDescription(name: string): string {
  return name;
}

function getImageUrl(url: string | null): string | null {
  if (!url) return null;
  return '/' + url.replace(/ /g, '%20');
}

export function getMenuCategories(): ProcessedCategory[] {
  const data = menuData as MenuCategory;

  return Object.entries(data).map(([categoryName, items]) => ({
    name: categoryName,
    slug: slugify(categoryName),
    count: items.length,
    items: items.map((item): ProcessedMenuItem => ({
      name: item.name,
      description: item.description ?? getFallbackDescription(item.name),
      price: item.price,
      imageUrl: getImageUrl(item.image_url),
      hasImage: item.image_url !== null,
    })),
  }));
}

export function getTotalPlatCount(): number {
  const data = menuData as MenuCategory;
  return Object.values(data).reduce((sum, items) => sum + items.length, 0);
}

export function getCategoryCount(): number {
  const data = menuData as MenuCategory;
  return Object.keys(data).length;
}
