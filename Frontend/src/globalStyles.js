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
  }

  h1, header {
    font-size: 32px; /* 1.5x the font-size for body text */
    font-weight: 700;
    letter-spacing: -2%; /* Adjusted letter spacing for headers */

    @media only screen and (max-width: 480px) {
			font-size: 20px;
		}
    @media only screen and (min-width: 768px) and (max-width: 940px) {
			font-size: 24px;
		}
    
  }

  p, ul, ol, li, h2, h3, h4, h5, h6, a {
    font-size: 20px; /* 1x the font-size for body text */
    color: #bcbcbc; /* Neutral gray */
    line-height: 1.4; /* 1.4x the font-size for body text */

      @media only screen and (max-width: 480px) {
			font-size: 18px;
		}
  }

  a, link {
    text-decoration: none;
    color: #252322;
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

  /* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
	border-radius: 50%;
}

.spinner {
	color: #ffffff;
	font-size: 22px;
	text-indent: -99999px;
	margin: 0px auto;
	position: relative;
	width: 20px;
	height: 20px;
	box-shadow: inset 0 0 0 2px;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
}

.spinner:before,
.spinner:after {
	position: absolute;
	content: "";
}

.spinner:before {
	width: 10.4px;
	height: 20.4px;
	background: #5469d4;
	border-radius: 20.4px 0 0 20.4px;
	top: -0.2px;
	left: -0.2px;
	-webkit-transform-origin: 10.4px 10.2px;
	transform-origin: 10.4px 10.2px;
	-webkit-animation: loading 2s infinite ease 1.5s;
	animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
	width: 10.4px;
	height: 10.2px;
	background: #5469d4;
	border-radius: 0 10.2px 10.2px 0;
	top: -0.1px;
	left: 10.2px;
	-webkit-transform-origin: 0px 10.2px;
	transform-origin: 0px 10.2px;
	-webkit-animation: loading 2s infinite ease;
	animation: loading 2s infinite ease;
}

@keyframes loading {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@media only screen and (max-width: 600px) {
	form {
		width: 80vw;
		min-width: initial;
	}
}


  /* Add any other global styles you want */
  /* ... */
`;

export default GlobalStyles;
