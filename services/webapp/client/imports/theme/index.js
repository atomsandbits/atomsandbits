import { createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';

export const colors = {
  primary: '#0070e0', // #0070e0
  secondary: '#FF5252', // #FF5252
  tertiary: '#84DCC6', // #A5FFD6, #84DCC6, #61E8E1, #36F1CD #FF74B8
  background: {
    default: '#FFFFFF',
    light: '#F7F9FA',
    dark: '#404040',
  },
  text: {
    default: '#484848', // #454545
    secondary: 'rgba(0, 0, 0, 0.54)',
    contrast: '#000000',
    light: '#637282',
    inverse: '#FFFFFF',
    inverseContrast: '#FFFFFF',
  },
};
export const fonts = {
  header: 'Poppins',
  text: 'Lato',
  monospace: 'Space Mono',
  logo: 'Poppins',
};
export const sizes = {
  header: '46px',
  drawer: '275px',
};
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

export const MuiTheme = createMuiTheme({
  palette: {
    text: {
      primary: '#000',
    },
    common: {
      white: '#FFF',
    },
    primary: {
      light: '#0070e0',
      main: '#0070e0',
      dark: '#0070e0',
      contrastText: 'black',
    },
    secondary: {
      light: '#FF5252',
      main: '#FF5252',
      dark: '#FF5252',
      contrastText: 'white',
    },
    error: {
      light: 'pink',
      main: 'pink',
      dark: 'pink',
      contrastText: 'black',
    },
    background: {
      default: 'white',
      drawer: '#F7F9FA',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: 'Quicksand, Roboto, Arial',
    title: {
      // fontFamily: 'Fredoka One, Roboto, Helvetica, Arial',
      // fontWeight: 500,
      // letterSpacing: 1
    },
  },
});
