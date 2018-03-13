import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FaCloud from 'react-icons/lib/fa/cloud';



export const NavigationBarStyle = styled.header`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    max-width: 1600px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: box-shadow 200ms;
    width: 100%;
    z-index: 100;
    // animation: ${props => props.fixed ? "fadeStickyIn .3s ease-in-out forwards": ""};
    @media (min-width: 600px) {
      padding-right: 20px;
    }
`
export const Logo = styled(FaCloud)`
  font-size: 3rem;
  color: white;
  stroke: #0070e0;
  padding: 15px 30px;
  stroke-width: 3px;
`;

export const MenuButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 25px;
    @media (min-width: 600px) {
        display: none;
    }
`
export const MenuStyle = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    color: black;
    border-radius: 2px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;
export const MenuLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 20px 60px 20px 40px;
    transition: background-color 300ms;
    &:hover {
        background-color: gainsboro;
    }
`

export const IconLink = styled(Link)`
    display: flex;
    align-items: center;
    height: 100%;
    transition: color 300ms;
    &:hover {
        color: #ff5252;
    }
    @media (max-width: 600px) {
        display: none;
    }
`;
export const TextLink = IconLink.extend`
    padding: 5px 10px;
    font-weight: bold;
`;
export const GetStartedLink = styled("a")`
    display: flex;
    font-weight: 400;
    align-items: center;
    margin-left: auto;
    background-color: rgba(255,255,255,0.9);
    color: black;
    border-radius: 24px;
    padding: 7px 14px;
    transition: background-color 300ms;
    &:hover {
        background-color: white;
    }
`
