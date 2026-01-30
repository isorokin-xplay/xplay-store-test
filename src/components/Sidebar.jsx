import React from 'react';
import styled from 'styled-components';
import { icons } from '../assets/icons';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 100px); /* Adjust based on header height */
  padding: 16px 0;
  color: var(--text-primary);
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }

  img {
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ActiveHighlight = styled(NavItem)`
  background: #2d3238;
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 32px;
    background: #00e5ff;
    border-radius: 0 4px 4px 0;
    display: ${props => props.active ? 'block' : 'none'};
  }
`;

const MarketBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px;
  background: #23272b;
  border-radius: 12px;
  margin-top: 4px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: #2b3035;
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    background: #3a4750;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00e5ff;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 24px;
`;

const BottomButtonsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const BottomButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #1a1d20;
  border: 0px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #23272b;
    border-color: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
`;

const SocialsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  
  img {
    width: 20px;
    height: 20px;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

const SkinchangerText = styled.span`
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <NavSection>
        <NavItem>
          <img src={icons.servers} alt="" />
          <span>Servers</span>
        </NavItem>
        <NavItem>
          <img src={icons.pickems} alt="" />
          <span>Pick'ems</span>
        </NavItem>
        <NavItem>
          <img src={icons.personal} alt="" />
          <span>Personal matches</span>
        </NavItem>
        <NavItem>
          <img src={icons.challenges} alt="" />
          <span>Challenges</span>
        </NavItem>
        <NavItem>
          <img src={icons.skinchanger} alt="" />
          <SkinchangerText>Skinchanger</SkinchangerText>
        </NavItem>

        <div style={{ margin: '16px 0' }} />

        <NavItem>
          <img src={icons.buy} alt="" />
          <span>Купить за xcoins</span>
        </NavItem>
        <NavItem>
          <img src={icons.sell} alt="" />
          <span>Продать за xcoins</span>
        </NavItem>

        <MarketBadge>
          <div className="icon-wrapper">
            <img src={icons.market} alt="" style={{ width: 20, height: 20 }} />
          </div>
          <span style={{ fontWeight: 500 }}>xplay Market</span>
        </MarketBadge>
      </NavSection>

      <BottomSection>
        <BottomButton style={{ width: '100%', marginBottom: 2 }}>
          <img src={icons.pro} alt="" />
          PRO Configs
        </BottomButton>
        <BottomButtonsRow>
          <BottomButton>
            <img src={icons.faq} alt="" />
            FAQ
          </BottomButton>
          <BottomButton>
            <img src={icons.blog} alt="" />
            Блог
          </BottomButton>
        </BottomButtonsRow>

        <SocialsRow>
          <img src={icons.discord} alt="Discord" />
          <img src={icons.instagram} alt="Instagram" />
          <img src={icons.x} alt="X" />
          <img src={icons.steam} alt="Steam" />
          <img src={icons.vk} alt="VK" />
          <img src={icons.telegram} alt="Telegram" />
        </SocialsRow>
      </BottomSection>
    </SidebarWrapper>
  );
};

export default Sidebar;
