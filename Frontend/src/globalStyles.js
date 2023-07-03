import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset browser default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Set global font styles */
  body {
    font-family: 'Roboto', sans-serif; /* Update this with your preferred font */
    color: #252322; /* Dark Gray */
    background-color: #ffffff; /* White */
    
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif; /* Update this with your preferred title font */
    line-height: 1.2; /* 1.2x the font-size for headers */
    text-align: center; /* Center align headers */
  }

  h1 {
    font-size: 44px; /* 1.5x the font-size for body text */
    font-weight: 700;
    letter-spacing: -2%; /* Adjusted letter spacing for headers */

    @media only screen and (max-width: 720px) {
			font-size: 28px;
		}
    
  }

  p, ul, ol, li, h2, h3, h4, h5, h6 {
    font-size: 26px; /* 1x the font-size for body text */
    color: #bcbcbc; /* Neutral gray */
    line-height: 1.4; /* 1.4x the font-size for body text */
    margin: 0 auto; /* Center align body text */

      @media only screen and (max-width: 720px) {
			font-size: 22px;
		}
  }

  a, link {
    text-decoration: none;
  }

  a:hover, link:hover {
    color: #e6b800; /* Bright accent */
    cursor: pointer;
  }

  /* Add padding to all elements */
  h1, h2, h3, p, ul, ol, li, small, a, link {
    margin-block: 1rem;
  }

  /* Container for the body text */
  .text-container {
    max-width: 600px; /* Max-width for body text */
    margin: 0 auto; /* Center align container */
    overflow-wrap: break-word; /* Wrap long words to the next line */
  }

  /* Add any other global styles you want */
  /* ... */
`;

export default GlobalStyles;
