import React from 'react';
import styled from 'styled-components';
import { icons as ASSETS } from '../assets/icons';

const Container = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 45px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #282d32;
  
  background-color: ${props => props.active ? '#282d32' : '#101112'};
  
  &:hover {
    background-color: ${props => props.active ? '#32383e' : '#16191b'};
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Label = styled.p`
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.48px;
  color: #ffffff;
  margin: 0;
`;



const TabMenu = () => {
  return (
    <Container>
      <Tab active={true}>
        <Icon src={ASSETS.cart} alt="Buy" />
        <Label>Купить скин</Label>
      </Tab>
      <Tab active={false}>
        <Icon src={ASSETS.sell} alt="Sell" />
        <Label>Продать скин</Label>
      </Tab>
    </Container>
  );
};

export default TabMenu;
