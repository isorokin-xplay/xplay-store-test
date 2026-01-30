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
  width: 320px;
  background-color: #000000;
  border: 1px solid #252a2e;
  border-radius: 12px;
  padding: 16px;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const QualityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#ffffff' : 'transparent'};
  color: ${props => props.selected ? '#000000' : '#ffffff'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#ffffff' : '#1f2327'};
  }
`;

const Acronym = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.color};
  width: 30px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: inherit;
`;

const QUALITIES = [
    { id: 'Factory New', acronym: 'FN', label: 'Прямо с завода', color: '#2b8a3e' }, // Adjusted colors to be visible on black but approximate cs style
    { id: 'Minimal Wear', acronym: 'MW', label: 'Немного поношено', color: '#97d656' },
    { id: 'Field-Tested', acronym: 'FT', label: 'После полевых испытаний', color: '#d1b645' },
    { id: 'Well-Worn', acronym: 'WW', label: 'Поношенное', color: '#e69038' },
    { id: 'Battle-Scarred', acronym: 'BS', label: 'Закаленное в боях', color: '#d64545' },
];

// Refined colors based on screenshot approximation
// FN - Teal/Blueish: #4fd1c5
// MW - Green: #a3cf5b
// FT - Yellow: #eacc4d
// WW - Orange: #ff922b
// BS - Red: #ff6b6b

const QUALITY_DEFINITIONS = [
    { id: 'Factory New', acronym: 'FN', label: 'Прямо с завода', color: '#4fd1c5' },
    { id: 'Minimal Wear', acronym: 'MW', label: 'Немного поношено', color: '#a3cf5b' },
    { id: 'Field-Tested', acronym: 'FT', label: 'После полевых испытаний', color: '#eacc4d' },
    { id: 'Well-Worn', acronym: 'WW', label: 'Поношенное', color: '#ff922b' },
    { id: 'Battle-Scarred', acronym: 'BS', label: 'Закаленное в боях', color: '#ff6b6b' },
];

const QualityFilter = ({ activeQualities, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleQuality = (qualityId) => {
        if (activeQualities.includes(qualityId)) {
            onFilterChange(activeQualities.filter(id => id !== qualityId));
        } else {
            onFilterChange([...activeQualities, qualityId]);
        }
    };

    const isActive = activeQualities.length > 0;

    return (
        <FilterWrapper ref={wrapperRef}>
            <FilterButton onClick={() => setIsOpen(!isOpen)} active={isActive || isOpen}>
                Качество {isActive && `(${activeQualities.length})`}
                <IconArrow src={ASSETS.arrowDown} isOpen={isOpen} />
            </FilterButton>

            {isOpen && (
                <DropdownContent>
                    {QUALITY_DEFINITIONS.map((quality) => {
                        const isSelected = activeQualities.includes(quality.id);
                        return (
                            <QualityRow
                                key={quality.id}
                                selected={isSelected}
                                onClick={() => toggleQuality(quality.id)}
                            >
                                <Acronym color={!isSelected ? quality.color : 'inherit'}>{quality.acronym}</Acronym>
                                <Label>{quality.label}</Label>
                            </QualityRow>
                        );
                    })}
                </DropdownContent>
            )}
        </FilterWrapper>
    );
};

export default QualityFilter;
