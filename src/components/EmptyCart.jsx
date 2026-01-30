import React from 'react';
import styled from 'styled-components';
import { icons as ASSETS } from '../assets/icons';

const EmptyCartWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 375px;
  background-color: #1b1e21;
  border: 1px solid #282d32;
  border-radius: 24px;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 1);
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1b1e21;
  border-bottom: 1px solid #282d32;
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CartIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const Title = styled.h2`
  color: #a1aab2;
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px; 
  gap: 16px;
  min-height: 250px;
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const EmptyTitle = styled.h3`
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.48px;
  margin: 0;
  text-align: center;
`;

const EmptySubtitle = styled.p`
  color: #bbb9c7;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.32px;
  margin: 0;
  text-align: center;
`;

const EmptyCart = () => {
    return (
        <EmptyCartWrapper>
            <Header>
                <CartIcon src={ASSETS.cart} alt="Cart" />
                <Title>Корзина</Title>
            </Header>
            <Content>
                <EmptyIcon>
                    <img src={ASSETS.inbox} alt="Empty" />
                </EmptyIcon>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <EmptyTitle>Корзина пуста</EmptyTitle>
                    <EmptySubtitle>Выбери скины, которые хочешь купить</EmptySubtitle>
                </div>
            </Content>
        </EmptyCartWrapper>
    );
};

export default EmptyCart;
