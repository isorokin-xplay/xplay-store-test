import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  :root {
    --bg-dark: #101112;
    --bg-surface: #16191b;
    --text-primary: #ffffff;
    --text-secondary: #a1aab2;
    --text-muted: #717981;
    --accent-yellow: #f3d482;
    --gradient-golden: linear-gradient(90deg, #f3d482 0%, #d4af37 100%);
    --bg-header: #101112;
    --border: #1c1f22;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Manrope', sans-serif;
    background-color: #101112; /* Fallback */
    background-color: var(--bg-dark);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    height: 100vh;
  }
`;
