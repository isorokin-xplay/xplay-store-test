import React from 'react';
import styled from 'styled-components';
import { icons as ASSETS } from '../assets/icons';

const HeaderWrapper = styled.header`
  height: 64px;
  background-color: var(--bg-header);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1560px; /* Aligned with LayoutWrapper */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px; /* Slight padding to offset from edges if needed */
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px; /* Gap between logo container and campaign text */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 236px;
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
`;

const PlayerStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatsLabel = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const StatsValue = styled.span`
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.4px;
`;

const CampaignText = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WalletContainer = styled.div`
  background-color: var(--bg-surface);
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.28px;
`;

const WalletIcon = styled.div`
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.button`
  background: var(--bg-surface);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #252a2e;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const ProfileContainer = styled.div`
  background: var(--bg-surface);
  height: 40px;
  padding: 2px 8px 2px 2px;
  border-radius: 24px 8px 24px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #252a2e;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 12px;
`;

const PremiumButton = styled.button`
  background: linear-gradient(148.529deg, rgb(239, 212, 141) 0%, rgb(255, 237, 191) 50%, rgb(195, 152, 38) 100%);
  border: none;
  height: 40px;
  min-width: 196px;
  padding: 0 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #101112;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.32px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CrownIcon = styled.img`
  width: 20px;
  height: 16px;
`;



const Header = () => {
  return (
    <HeaderWrapper>
      <InnerContainer>
        <LeftSection>
          <LogoContainer>
            <Logo src={ASSETS.logo} alt="Xplay" />
            <PlayerStats>
              <StatsLabel>Players right now</StatsLabel>
              <StatsValue>6007</StatsValue>
            </PlayerStats>
          </LogoContainer>
          <CampaignText>Покупай скины</CampaignText>
        </LeftSection>

        <RightSection>
          <WalletContainer>
            <WalletIcon>
              <img src={ASSETS.coin} alt="Coin" style={{ width: '24px', height: '24px' }} />
            </WalletIcon>
            650235
          </WalletContainer>
          <IconButton>
            <img src={ASSETS.mail} alt="Messages" />
          </IconButton>
          <ProfileContainer>
            <Avatar src={ASSETS.avatar} alt="User" />
            <ArrowIcon src={ASSETS.arrow} />
          </ProfileContainer>
          <PremiumButton>
            <CrownIcon src={ASSETS.crown} alt="Premium" />
            Получить премиум
          </PremiumButton>
        </RightSection>
      </InnerContainer>
    </HeaderWrapper>
  );
};

export default Header;
