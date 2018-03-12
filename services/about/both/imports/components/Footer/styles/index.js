import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterStyle = styled.div`
    align-items: center;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "#404040"};
    box-sizing: border-box;
    color:  ${props => props.textColor ? props.textColor : "white"};
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 500;
    flex-wrap: wrap;
    padding: 1rem;
    width: 100%;
    @media (max-width: 768px) {
        padding-bottom: 2rem;
    }
`
export const DividerStyle = styled.span`
    color: white;
    margin: 0 0.2rem;
`;

export const FooterLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    transition: color 300ms;
    &:hover {
        color: #36F1CD;
    }
`;
export const FooterLinkA = styled("a")`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    transition: color 300ms;
    &:hover {
        color: #36F1CD;
    }
`;

export const ContactInformationContainer = styled.div`
  display: flex;
  padding: 0 40px;
  align-items: center;
`;
