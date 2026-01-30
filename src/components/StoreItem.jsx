import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #151718;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  min-height: 320px;

  &:hover {
    border-color: rgba(141, 239, 233, 0.2);
    background: rgba(22, 25, 27, 0.9);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeaponType = styled.span`
  color: #a1aab2;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.32px;
`;

const SkinName = styled.h3`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-top: 2px;
  line-height: 1.2;
`;

const Price = styled.span`
  color: #8defe9;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.32px;
`;

const QualityGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
`;

const QualityDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #eb00ff;
`;

const QualityText = styled.span`
  color: #717981;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.24px;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;

  img {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
  }
`;

const ActionArea = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 4px;
`;

const BuyButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TradeBanInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #717981;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const StoreItem = ({ item }) => {
  const isTradeBan = item.state === 'tradeban';

  return (
    <Card>
      <CardHeader>
        <TitleGroup>
          <WeaponType>{item.weapon}</WeaponType>
          <SkinName>{item.name}</SkinName>
        </TitleGroup>
        <Price>${item.price}</Price>
      </CardHeader>

      <QualityGroup>
        <QualityDot />
        <QualityText>{item.quality}</QualityText>
      </QualityGroup>

      <ImageContainer>
        <img src={item.image} alt={`${item.weapon} ${item.name}`} />
      </ImageContainer>

      <ActionArea>
        {isTradeBan ? (
          <TradeBanInfo>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            TRADE BAN (LESS THAN 30 MIN)
          </TradeBanInfo>
        ) : (
          <BuyButton>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_150_20608)">
                <path d="M1.2905 0.666016C1.12514 0.666016 0.966545 0.7304 0.849614 0.845006C0.732683 0.959612 0.666992 1.11505 0.666992 1.27713C0.666992 1.4392 0.732683 1.59464 0.849614 1.70925C0.966545 1.82385 1.12514 1.88824 1.2905 1.88824H1.59727C1.73266 1.88847 1.8643 1.93188 1.97228 2.01193C2.08027 2.09197 2.15874 2.20428 2.19584 2.3319L4.17361 9.11524C4.28548 9.49804 4.52146 9.83475 4.84588 10.0744C5.17031 10.3141 5.56554 10.4438 5.97182 10.4438H11.6695C12.0434 10.4439 12.4087 10.3341 12.7184 10.1286C13.028 9.9232 13.2677 9.63151 13.4066 9.29124L15.2447 4.78613C15.3202 4.60075 15.3483 4.40005 15.3265 4.20157C15.3046 4.0031 15.2335 3.81289 15.1193 3.64758C15.0052 3.48226 14.8514 3.34687 14.6715 3.25324C14.4916 3.15961 14.2911 3.11059 14.0874 3.11046H3.7197L3.39423 1.99579C3.28265 1.61296 3.04695 1.27613 2.72276 1.03622C2.39856 0.796313 2.00349 0.666363 1.59727 0.666016H1.2905ZM6.27858 15.3327C6.52423 15.3327 6.76746 15.2853 6.99441 15.1931C7.22135 15.101 7.42755 14.966 7.60125 14.7957C7.77494 14.6255 7.91273 14.4234 8.00673 14.2009C8.10073 13.9785 8.14912 13.7401 8.14912 13.4993C8.14912 13.2586 8.10073 13.0202 8.00673 12.7978C7.91273 12.5753 7.77494 12.3732 7.60125 12.203C7.42755 12.0327 7.22135 11.8977 6.99441 11.8056C6.76746 11.7134 6.52423 11.666 6.27858 11.666C5.78249 11.666 5.30671 11.8592 4.95592 12.203C4.60513 12.5468 4.40805 13.0131 4.40805 13.4993C4.40805 13.9856 4.60513 14.4519 4.95592 14.7957C5.30671 15.1395 5.78249 15.3327 6.27858 15.3327ZM11.2667 15.3327C11.5123 15.3327 11.7555 15.2853 11.9825 15.1931C12.2094 15.101 12.4156 14.966 12.5893 14.7957C12.763 14.6255 12.9008 14.4234 12.9948 14.2009C13.0888 13.9785 13.1372 13.7401 13.1372 13.4993C13.1372 13.2586 13.0888 13.0202 12.9948 12.7978C12.9008 12.5753 12.763 12.3732 12.5893 12.203C12.4156 12.0327 12.2094 11.8977 11.9825 11.8056C11.7555 11.7134 11.5123 11.666 11.2667 11.666C10.7706 11.666 10.2948 11.8592 9.944 12.203C9.59321 12.5468 9.39614 13.0131 9.39614 13.4993C9.39614 13.9856 9.59321 14.4519 9.944 14.7957C10.2948 15.1395 10.7706 15.3327 11.2667 15.3327Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_150_20608">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            В корзину
          </BuyButton>
        )}
      </ActionArea>
    </Card>
  );
};

export default StoreItem;
