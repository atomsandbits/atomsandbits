import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  @media (min-width: 767px) {
    display: none;
  }
`;
export const MenuStyle = styled.div`
  position: absolute;
  top: 50px;
  background-color: white;
  color: black;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 20px 30px 20px 40px;
  transition: background-color 300ms;
  &:hover {
    background-color: gainsboro;
  }
`;

export const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  transition: color 300ms;
  &:hover {
    color: white;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const TextLink = IconLink.extend`
  padding: 0 0.5rem 0 0;
  font-weight: bold;
`;
export const GetStartedLink = styled('a')`
  display: flex;
  font-weight: 400;
  align-items: center;
  margin-left: auto;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  border-radius: 24px;
  padding: 7px 14px;
  transition: background-color 300ms;
  &:hover {
    background-color: white;
  }
`;
