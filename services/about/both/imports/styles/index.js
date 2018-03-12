import { injectGlobal } from 'styled-components';
import styled from 'styled-components';

/* Backup Colors
baby-blue: #33eeff
darker-blue: #3C9AD8
*/

injectGlobal`
    body {
        background-color: white;
        color: #454545;
        margin: 0;
        font-family: Raleway, Helvetica, Arial, Sans-serif;
        cursor: default;
    }
    a {
        text-decoration: none;
        underline: none;
        color: inherit;
    }
    h1 {
        font-size: 2.5rem;
        font-weight: 400;
        font-family: Poppins;
        @media (max-width: 960px) {
            font-size: 1.5rem;
        }
    }
    h2 {
        font-size: 1.75rem;
        font-weight: 300;
        @media (max-width: 960px) {
            font-size: 1.25rem;
        }
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        list-style-type: none;
    }

    @keyframes fadeStickyIn {
        0% {
            opacity: 0;
            top: -3rem
        }

        to {
            opacity: 1;
            top: 0
        }
    }

    @keyframes fadeStickyOut {
        0% {
            opacity: 1;
            top: 0
        }

        to {
            opacity: 0;
            top: -3rem
        }
    }
`

const RootStyle = styled.div`
    display: block;
    background: white;
`;

const ContainerStyle = styled.div`
    width: 100%;
`

const NavigationBarStyle = styled.header`
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "#223"};
    box-shadow: ${props => props.fixed ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)": "none"};
    box-sizing: border-box;
    color:  ${props => props.textColor ? props.textColor : "#acf"};
    display: flex;
    height: ${props => props.height ? props.height : "48px"};
    max-width: 1600px;
    padding: 0 1.25rem;
    transition: box-shadow 200ms;
    width: 100%;
    z-index: 100;
    // animation: ${props => props.fixed ? "fadeStickyIn .3s ease-in-out forwards": ""};
`


const SmallSectionStyle = styled.section`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "#223"};
    color:  ${props => props.textColor ? props.textColor : "#acf"};
    display: flex;
    padding: 4rem;
    padding-top: 5.25rem;
    padding-bottom: ${props => props.noBottomPadding ? "0" : "8.25rem"};
    flex-direction: ${props=> props.column ? "column": "row"};
    padding: ${props => props.noPadding ? 0: ""};
    ${props => props.backgroundColor ? "": "h2 {font-weight: 400}"};
    @media (max-width: 768px) {
        padding: 0;
        padding-top: 2.25rem;
        padding-bottom: ${props => props.noBottomPadding ? "0" : "4.25rem"};
    }
`

const SpotlightCircle = styled.div`
    // border: 1px solid black;
    align-items: center;
    background-color: ${props => props.dark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.15)"};
    border-radius: 100%;
    border: ${props => props.dark ? "1px solid black" : "1px solid white"};
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    color:  ${props => props.dark ? "black" : "white"};
    display: block;
    display: flex;
    font-size: 3.5rem;
    height: 180px;
    justify-content: center;
    margin: auto 0;
    @media (max-width: 768px) {
        display: none;
    }
    ${props => props.right ? "margin-left: 4rem" : "margin-right: 4rem"};
    min-width: 180px;
    position: relative;
    &:before {
        background: ${props => props.dark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.5)"};
        border-radius: 100%;
        bottom: 0;
        content: '';
        display: block;
        height: 1rem;
        margin-top: -0.5rem;
        position: absolute;
        top: 50%;
        width: 1rem;
        ${props => props.right ? "left: -3.35rem" : "right: -3.35rem"};
    }
    &:after {
        background: ${props => props.dark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.5)"};
        bottom: 50%;
        content: '';
        height: 1px;
        position: absolute;
        width: 2.35rem;
        ${props => props.right ? "right: 100%; margin-right: -0.5px;" : "left: 100%; margin-left: -0.5px;"}
    }
`

export {RootStyle, ContainerStyle, NavigationBarStyle, FooterStyle, DividerStyle, SmallSectionStyle, SpotlightCircle};
