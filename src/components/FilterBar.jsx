import React from 'react';
import styled from 'styled-components';
import { icons as ASSETS } from '../assets/icons';
import WeaponFilter from './WeaponFilter';

const FilterBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const FilterDropdown = styled.div`
  background-color: #16191b;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #a1aab2;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #252a2e;
  }
`;

const IconArrow = styled.img`
  width: 10px;
  height: 5px;
  flex-shrink: 0;
  object-fit: contain;
`;

const ToggleContainer = styled.div`
  background-color: #16191b;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a1aab2;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const ToggleSwitch = styled.div`
  width: 36px;
  height: 20px;
  background-color: ${props => props.active ? '#f3d482' : '#282d32'};
  border-radius: 142px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 1px;
  left: ${props => props.active ? '17px' : '1px'};
  width: 18px;
  height: 18px;
  background-color: ${props => props.active ? '#101112' : '#ffffff'};
  border-radius: 50%;
  transition: left 0.2s, background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: contain;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 320px;
  margin-left: auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #101112;
  border: 1px solid #282d32;
  border-radius: 8px;
  padding: 0 16px;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  
  &::placeholder {
    color: #4a5259;
  }

  &:focus {
    outline: none;
    border-color: #3b4248;
  }
`;

const SortButton = styled.div`
  background-color: #1b1e21;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #252a2e;
  }
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  object-fit: contain;
`;



import QualityFilter from './QualityFilter';
import RangeFilter from './RangeFilter';

const FilterBar = (props) => {
  return (
    <FilterBarWrapper>
      <RangeFilter
        label="Цена"
        min={0}
        max={200}
        step={1}
        value={props.priceRange}
        onChange={props.setPriceRange}
        formatValue={(v) => `$${v}`}
      />
      <WeaponFilter
        categories={props.categories}
        activeFilters={props.activeWeaponFilters}
        onFilterChange={props.onWeaponFilterChange}
      />
      <QualityFilter
        activeQualities={props.activeQualities}
        onFilterChange={props.setActiveQualities}
      />
      <FilterDropdown>
        Другое <IconArrow src={ASSETS.arrowDown} />
      </FilterDropdown>
      <RangeFilter
        label="Float"
        min={0}
        max={1}
        step={0.0001}
        value={props.floatRange}
        onChange={props.setFloatRange}
        formatValue={(v) => v.toFixed(4)}
      />
      <FilterDropdown>
        Редкость <IconArrow src={ASSETS.arrowDown} />
      </FilterDropdown>

      <ToggleContainer>
        В трейд-бане
        <ToggleSwitch active={true}>
          <ToggleCircle active={true}>
            <CheckIcon src={ASSETS.check} />
          </ToggleCircle>
        </ToggleSwitch>
      </ToggleContainer>

      <SearchContainer>
        <SearchInput placeholder="Name" />
      </SearchContainer>

      <SortButton>
        <SortIcon src={ASSETS.sort} alt="Sort" />
        Сортировка <IconArrow src={ASSETS.arrowDown} />
      </SortButton>
    </FilterBarWrapper>
  );
};

export default FilterBar;
