import { useState, useMemo } from 'react';
import Header from './components/Header';
import TabMenu from './components/TabMenu';
import FilterBar from './components/FilterBar';
import CartButton from './components/CartButton';
import StoreItem from './components/StoreItem';
import Sidebar from './components/Sidebar';
import { GlobalStyles } from './styles/GlobalStyles';
import {
  LayoutWrapper,
  MainContainer,
  SidebarContainer,
  ContentArea,
  FilterBarContainer,
  FiltersArea,
  CartArea,
  GridArea
} from './components/LayoutStyles';
import db from '../db.json';

function App() {
  // State for weapon filter
  const [activeWeaponFilters, setActiveWeaponFilters] = useState({
    categories: [],
    weapons: []
  });

  // State for range filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [floatRange, setFloatRange] = useState({ min: 0, max: 1 });

  // State for quality filter
  const [activeQualities, setActiveQualities] = useState([]);

  const items = db.items;

  // Filter items logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Weapon/Category Filter
      const hasCatFilter = activeWeaponFilters.categories.length > 0;
      const hasWeaponFilter = activeWeaponFilters.weapons.length > 0;

      let matchesType = true;
      if (hasCatFilter || hasWeaponFilter) {
        const isCategoryMatch = activeWeaponFilters.categories.includes(item.category);
        const isWeaponMatch = activeWeaponFilters.weapons.includes(item.weapon);
        matchesType = isCategoryMatch || isWeaponMatch;
      }

      // Price Filter
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;

      // Float Filter
      // If item doesn't have float, we assume it matches or handle it based on requirements.
      // For now, let's assume all items we want to filter have float, or if undefined we show it 
      // ONLY if the range covers the "undefined" space? 
      // Actually simpler: if item has float, check range. If not, maybe show it?
      // Let's assume for this store context items have float.
      // But looking at existing items, manual added float.
      const itemFloat = item.float !== undefined ? item.float : 0; // Default to 0 if missing for safety
      const matchesFloat = itemFloat >= floatRange.min && itemFloat <= floatRange.max;

      // Quality Filter
      const matchesQuality = activeQualities.length === 0 || activeQualities.includes(item.quality);

      return matchesType && matchesPrice && matchesFloat && matchesQuality;
    });
  }, [items, activeWeaponFilters, priceRange, floatRange, activeQualities]);

  // Handle translations if needed, but for now using DB values (English)
  // The screenshot shows Russian. I might need a mapping map if I want to show "Пистолеты" instead of "Pistol".
  // Looking at the screenshot: "Пистолеты", "Снайперские винтовки", "Штурмовые винтовки", "Ножи"...
  // DB values: "SMG", "Rifle", "Pistol".
  // I should probably add a translation map.

  const categoryTranslations = {
    'Pistol': 'Пистолеты',
    'Rifle': 'Винтовки', // Need to check if there are sub-types in DB like Sniper vs Assault
    'SMG': 'ПП',
    'Heavy': 'Тяжелое',
    'Knife': 'Ножи',
    'Gloves': 'Перчатки',
    'Shotgun': 'Дробовики',
    'Machinegun': 'Пулеметы'
  };

  // Improved category generation with translation
  const displayedCategories = useMemo(() => {
    const cats = {};
    items.forEach(item => {
      // Need to distinguish Sniper vs Assault if DB only says "Rifle"
      // Looking at DB content, I saw "Rifle" for Galil and M4A1.
      // I saw "SG 553" as "Rifle".
      // Typically CS:GO splits these. If DB just has "Rifle", we might need to rely on weapon names or if there's a sub-category?
      // The snippet showed: "category": "Rifle", "weapon": "Galil AR".
      // "category": "Pistol", "weapon": "Glock-18".
      // Let's stick to DB categories for now to avoid over-engineering without data.
      // But I will apply translations where possible.

      let catName = item.category;
      // Simple heuristic for separation if needed, but sticking to DB first.

      if (!cats[item.category]) {
        cats[item.category] = {
          id: item.category, // Use DB value as ID
          name: categoryTranslations[item.category] || item.category, // Display name
          weapons: new Set()
        };
      }
      cats[item.category].weapons.add(item.weapon);
    });

    return Object.values(cats).map(c => ({
      ...c,
      weapons: Array.from(c.weapons).sort()
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <>
      <GlobalStyles />
      <LayoutWrapper>
        <Header />
        <MainContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <ContentArea>
            <TabMenu />
            <FilterBarContainer>
              <FiltersArea>
                <FilterBar
                  categories={displayedCategories}
                  activeWeaponFilters={activeWeaponFilters}
                  onWeaponFilterChange={setActiveWeaponFilters}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  floatRange={floatRange}
                  setFloatRange={setFloatRange}
                  activeQualities={activeQualities}
                  setActiveQualities={setActiveQualities}
                />
              </FiltersArea>
              <CartArea>
                <CartButton />
              </CartArea>
            </FilterBarContainer>
            <GridArea>
              {filteredItems.map(item => (
                <StoreItem key={item.id} item={item} />
              ))}
            </GridArea>
          </ContentArea>
        </MainContainer>
      </LayoutWrapper>
    </>
  );
}

export default App;
