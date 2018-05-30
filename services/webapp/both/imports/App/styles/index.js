/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'styled-components';

import { colors, fonts } from '/both/imports/theme';

injectGlobal`
  h1, h2, h3, h4 {
    font-family: ${fonts.header};
    font-weight: 500;
  }
  input {
    font-family: Quicksand !important;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  textarea {
    width: 100%;
    white-space: pre;
    text-align: left;
    font-family: ${fonts.monospace};
    overflow: auto;
    min-height: 275px;
    max-height: 375px;
    height: 100%;
    padding: 15px 15px 15px 25px;
    box-sizing: border-box;
    background-color: ${colors.background.default}
    border: 1px solid gainsboro;
    color: ${colors.text.default};
  }
`;
