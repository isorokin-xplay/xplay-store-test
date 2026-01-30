import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  background-color: #000000;
  border-radius: 12px;
  padding: 12px;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  width: 300px;
  border: 1px solid #252a2e;
`;

const InputsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  flex: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: #16191b;
  border: 1px solid #3b4248;
  border-radius: 8px;
  padding: 8px;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #f3d482;
  }

  /* Remove arrows from number input */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const Dash = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const SliderTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 6px;
  background-color: #282d32; /* inactive track color */
  border-radius: 3px;
`;

const ActiveTrack = styled.div`
  position: absolute;
  height: 6px;
  background-color: #f3d482; /* active track color */
  border-radius: 3px;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
`;

const Thumb = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fefbf3;
  border-radius: 50%;
  cursor: grab;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${props => props.left}%;
  z-index: 2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const RangeFilter = ({ label, min, max, step, value, onChange, formatValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  // Sync local state when props change
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // When closing, ensure we commit final value if needed, 
        // but we are pushing updates on change anyway.
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPercent = useCallback((val) => {
    return Math.round(((val - min) / (max - min)) * 100);
  }, [min, max]);

  const handleInputChange = (e, type) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) return;

    // Clamp logic loosely here, stricter on blur or slider effect
    let newVal = { ...localValue };
    if (type === 'min') {
      newVal.min = Math.min(val, localValue.max);
      // actually better to just allow typing and clamp on validation or effect
      // for better UX: just update local, clamp eventually
      newVal.min = val;
    } else {
      newVal.max = val;
    }
    setLocalValue(newVal);
    onChange(newVal);
  };

  // Slider logic
  const handleThumbMouseDown = (e, thumbType) => {
    e.preventDefault();
    const startX = e.clientX;
    const startVal = thumbType === 'min' ? localValue.min : localValue.max;
    const trackWidth = trackRef.current.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = deltaX / trackWidth;
      const deltaVal = deltaPercent * (max - min);

      let newVal = startVal + deltaVal;

      // Round to step
      // newVal = Math.round(newVal / step) * step; 
      // Better precision handling:
      const inv = 1.0 / step;
      newVal = Math.round(newVal * inv) / inv;

      // Constraints
      if (thumbType === 'min') {
        newVal = Math.max(min, Math.min(newVal, localValue.max));
        setLocalValue(prev => {
          const next = { ...prev, min: newVal };
          onChange(next);
          return next;
        });
      } else {
        newVal = Math.max(localValue.min, Math.min(newVal, max));
        setLocalValue(prev => {
          const next = { ...prev, max: newVal };
          onChange(next);
          return next;
        });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const minPercent = getPercent(localValue.min);
  const maxPercent = getPercent(localValue.max);

  return (
    <FilterWrapper ref={wrapperRef}>
      <FilterButton
        onClick={() => setIsOpen(!isOpen)}
        active={isOpen || localValue.min > min || localValue.max < max}
      >
        {label} <IconArrow src={ASSETS.arrowDown} isOpen={isOpen} />
      </FilterButton>

      {isOpen && (
        <DropdownContent>
          <InputsRow>
            <InputGroup>
              <StyledInput
                value={localValue.min}
                onChange={(e) => handleInputChange(e, 'min')}
                placeholder={min}
              />
            </InputGroup>
            <Dash>-</Dash>
            <InputGroup>
              <StyledInput
                value={localValue.max}
                onChange={(e) => handleInputChange(e, 'max')}
                placeholder={max}
              />
            </InputGroup>
          </InputsRow>

          <SliderContainer ref={trackRef}>
            <SliderTrack />
            <ActiveTrack
              left={minPercent}
              width={maxPercent - minPercent}
            />
            <Thumb
              left={minPercent}
              onMouseDown={(e) => handleThumbMouseDown(e, 'min')}
            />
            <Thumb
              left={maxPercent}
              onMouseDown={(e) => handleThumbMouseDown(e, 'max')}
            />
          </SliderContainer>
        </DropdownContent>
      )}
    </FilterWrapper>
  );
};

export default RangeFilter;
