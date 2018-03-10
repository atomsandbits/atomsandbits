import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    transition: color 300ms;
    &:hover {
        color: white;
    }
`

export const FooterLinkA = styled("a")`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    transition: color 300ms;
    &:hover {
        color: white;
    }
`