import styled from 'styled-components';
import { Link } from 'react-router-dom';
import _Button from 'material-ui/Button';
import { colors, fonts, sizes } from '/client/imports/theme';

export const DrawerContentContainer = styled.div`
  background-color: ${colors.background.light};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: auto;
  width: ${sizes.drawer};
`;
export const HeaderLogo = styled(Link)`
  && {
    color: ${colors.secondary};
    flex-shrink: 0;
    font-family: ${fonts.logo};
    font-size: 1.7rem;
    font-weight: 700;
    justify-content: flex-start;
    letter-spacing: 0.04rem;
    padding: 25px;
    text-transform: lowercase;
    width: 100%;
  }
`;
export const LinksContainer = styled.div`
  flex-grow: 1;
`;
export const LinkContainer = styled(Link)`
  && {
    align-items: flex-end;
    color: ${colors.primary};
    padding: 15px 25px;
    justify-content: flex-start;
    text-transform: none;
    width: 100%;
  }
`;
export const Button = styled(_Button)`
  && {
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;
export const LinkIcon = styled.span`
  color: ${colors.primary};
  display: flex;
  align-items: center;
  padding-right: 15px;
`;
export const LinkText = styled.span`
  color: ${colors.text.default};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.03rem;
`;
export const aContainer = styled.a`
  && {
    align-items: normal;
    color: ${colors.text.default};
    padding: 15px 25px;
    transition: background-color 400ms;
    justify-content: flex-start;
    text-transform: none;
    width: 100%;
  }
`;
export const FooterContainer = styled.div`
  margin-top: 20px;
`;

// const styles = theme => ({
//   drawerInner: {
//     minHeight: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   headerLogo: {
//     fontFamily: '\'Fredoka One\', Roboto, Helvetica, Arial',
//     fontWeight: 500,
//     letterSpacing: 1,
//     color: theme.palette.common.white,
//     textTransform: 'lowercase',
//     fontSize: '1.3rem',
//     padding: '25px 20px',
//     width: '100%',
//     justifyContent: 'flex-start'
//   },
//   linkContainer: {
//     flexGrow: 1
//   },
//   listItem: {
//     color: theme.palette.common.white,
//     transition: 'background-color 400ms'
//   },
//   linkIcon: {
//     color: theme.palette.common.white
//   },
//   linkText: {
//     color: theme.palette.common.white
//   },
//   footerContainer: {
//   }
// });
