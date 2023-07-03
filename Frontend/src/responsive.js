import { css } from "styled-components";

export const tablet = (props) => {
	return css`
		@media only screen and (max-width: 720px) {
			${props}
		}
	`;
};
export const mobile = (props) => {
	return css`
		@media only screen and (max-width: 540px) {
			${props}
		}
	`;
};
