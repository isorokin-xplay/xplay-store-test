import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1560px;
  width: 100%;
  padding: 0 20px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  margin-top: 16px;
`;

export const SidebarContainer = styled.aside`
  width: 250px;
  display: flex;
  flex-direction: column;
  color: var(--text-secondary);
`;

export const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;
`;

export const FilterBarContainer = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  z-index: 10;
`;

export const FiltersArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const CartArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  width: 100%;
  padding-bottom: 40px;
  background-color: transparent;
`;
