import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { icons as ASSETS } from '../assets/icons';

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterButton = styled.div`
  background-color: #16191b;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#ffffff' : '#a1aab2'};
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
  border: 1px solid ${props => props.active ? '#3b4248' : 'transparent'};

  &:hover {
    background-color: #252a2e;
  }
`;

const IconArrow = styled.img`
  width: 10px;
  height: 5px;
  flex-shrink: 0;
  object-fit: contain;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  width: 420px;
  background-color: #0d0e10;
  border: 1px solid #252a2e;
  border-radius: 12px;
  padding: 16px;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${props => props.checked ? '#f3d482' : '#3b4248'};
  background-color: ${props => props.checked ? '#f3d482' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.checked ? '#f3d482' : '#5a626a'};
  }
`;

const CheckIcon = styled.img`
  width: 10px;
  height: 10px;
  filter: brightness(0);
`;

const CategoryName = styled.span`
  color: #a1aab2;
  font-size: 14px;
  font-weight: 500;
`;

const ExpandArrow = styled.img`
  width: 10px;
  height: 6px;
  opacity: 0.5;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s;
`;

const WeaponsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0 8px 26px;
`;

const WeaponPill = styled.div`
  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${props => props.selected ? '#ffffff' : 'transparent'};
  color: ${props => props.selected ? '#000000' : '#a1aab2'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#ffffff' : '#1f2327'};
    color: ${props => props.selected ? '#000000' : '#ffffff'};
  }
`;

// Helper to check if any child weapon is selected
const isCategorySelected = (cat, selected) => {
    if (selected.categories.includes(cat.id)) return true;
    return cat.weapons.some(w => selected.weapons.includes(w));
};

const WeaponFilter = ({ categories, activeFilters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const wrapperRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCategory = (catId) => {
        setExpandedCategories(prev =>
            prev.includes(catId)
                ? prev.filter(id => id !== catId)
                : [...prev, catId]
        );
    };

    const handleCategoryCheckbox = (e, cat) => {
        e.stopPropagation();
        const isSelected = activeFilters.categories.includes(cat.id);
        let newCats = [...activeFilters.categories];
        let newWeapons = [...activeFilters.weapons];

        if (isSelected) {
            // Deselect category and all its weapons
            newCats = newCats.filter(id => id !== cat.id);
            newWeapons = newWeapons.filter(w => !cat.weapons.includes(w));
        } else {
            // Select category
            newCats.push(cat.id);
            // Ensure specific weapons are CLEARED if we just select the whole category? 
            // OR selecting category means "show all in category".
            // Let's follow requirement: "if category selected, show only category... if specific selected, show only specific".
            // Design implication: Selecting category checkbox usually implies "All of this category".
            // If I individually select weapons, the category checkbox might become "indeterminate" or "checked".
            // Let's implement: Checkbox = Select All in Category.
            newWeapons = newWeapons.filter(w => !cat.weapons.includes(w)); // Clear specifics to just show "All Category"
        }

        onFilterChange({ categories: newCats, weapons: newWeapons });
    };

    const handleWeaponClick = (weapon, catId) => {
        const isSelected = activeFilters.weapons.includes(weapon);
        let newWeapons = [...activeFilters.weapons];
        let newCats = [...activeFilters.categories];

        if (isSelected) {
            newWeapons = newWeapons.filter(w => w !== weapon);
        } else {
            newWeapons.push(weapon);
            // If we select a specific weapon, we should probably UNCHECK the main category "Select All" logic if it was checked?
            // Or maybe the Category Checkbox just reflects if *any* or *all* are selected.
            // Simplification: If category is in `categories` array, it means "All [Category]".
            // If weapons are in `weapons` array, it means "Just these weapons".
            // If a user clicks a specific weapon, remove category from "All" list.
            newCats = newCats.filter(c => c !== catId);
        }

        onFilterChange({ categories: newCats, weapons: newWeapons });
    };

    const isMenuOpen = isOpen;
    // Determine if main button is "active" (colored text)
    const isFilterActive = activeFilters.categories.length > 0 || activeFilters.weapons.length > 0;

    return (
        <FilterWrapper ref={wrapperRef}>
            <FilterButton onClick={() => setIsOpen(!isOpen)} active={isFilterActive || isMenuOpen}>
                Тип оружия <IconArrow src={ASSETS.arrowDown} isOpen={isMenuOpen} />
            </FilterButton>

            {isMenuOpen && (
                <DropdownContent>
                    {categories.map(cat => {
                        const isCatChecked = activeFilters.categories.includes(cat.id);
                        const isExpanded = expandedCategories.includes(cat.id);

                        return (
                            <CategoryRow key={cat.id}>
                                <CategoryHeader onClick={() => toggleCategory(cat.id)}>
                                    <LeftGroup>
                                        <Checkbox
                                            checked={isCatChecked}
                                            onClick={(e) => handleCategoryCheckbox(e, cat)}
                                        >
                                            {isCatChecked && <CheckIcon src={ASSETS.check} />}
                                        </Checkbox>
                                        <CategoryName>{cat.name}</CategoryName>
                                    </LeftGroup>
                                    <ExpandArrow src={ASSETS.arrowDown} expanded={isExpanded} />
                                </CategoryHeader>

                                {isExpanded && (
                                    <WeaponsGrid>
                                        {cat.weapons.map(weapon => (
                                            <WeaponPill
                                                key={weapon}
                                                selected={activeFilters.weapons.includes(weapon)}
                                                onClick={() => handleWeaponClick(weapon, cat.id)}
                                            >
                                                {weapon}
                                            </WeaponPill>
                                        ))}
                                    </WeaponsGrid>
                                )}
                            </CategoryRow>
                        );
                    })}
                </DropdownContent>
            )}
        </FilterWrapper>
    );
};

export default WeaponFilter;
