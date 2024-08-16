import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset some default browser styling */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base font settings */
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: ${({ theme }) => theme.tertiary}; /* tertiary */
    background-color: #f4f4f4;
    
  }

  /* Header styles */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.extra}; /* extra */
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  /* Paragraphs */
  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.primary}; /* primary */
  }

  /* Anchor styles */
  a {
    color: ${({ theme }) => theme.complementary}; /* complementary */
    text-decoration: none;
  }

  
  /* Button styles */
  button {
    background-color: ${({ theme }) => theme.brightAccent}; /* brightAccent */
    color: ${({ theme }) => theme.accent}; /* accent */
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) =>
			theme.darkerSecondary}; /* darkerSecondary */
  }

  /* Container for responsiveness */
  .container {
    
    margin: 0 auto;
   
	width: auto;
  }

  /* Responsive layout */
  @media (max-width: 1200px) {
    body {
      font-size: 15px;
    }
    h1 {
      font-size: 2.25rem;
    }
    h2 {
      font-size: 1.875rem;
    }
    h3 {
      font-size: 1.625rem;
    }
  }

  @media (max-width: 992px) {
    body {
      font-size: 14px;
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.75rem;
    }
    h3 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 13px;
    }
    h1 {
      font-size: 1.75rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.375rem;
    }
  }

  @media (max-width: 767px) {
    body {
      font-size: 12px;
    }
    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.125rem;
    }
  }

  /* Utility classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  /* Margin and padding utilities */
  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .mb-1 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 2rem; }

  .pt-1 { padding-top: 1rem; }
  .pt-2 { padding-top: 2rem; }
  .pb-1 { padding-bottom: 1rem; }
  .pb-2 { padding-bottom: 2rem; }

  /* Flexbox utilities */
  .flex {
    display: flex;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-row {
    flex-direction: row;
  }
`;

export default GlobalStyle;
