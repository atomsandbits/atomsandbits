import React from 'react';
import { colors, fonts } from '/client/imports/theme';

const styles = theme => ({
  container: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "default",
    [theme.breakpoints.down('md')]: {
      paddingTop: 60
    }
  },
  contentContainer: {
    display: "flex",
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    }
  },
  sectionContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstSection: {
    backgroundColor: colors.background.dark,
    color: "white"
  },
  proposition: {
    margin: "48px auto",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: 'default'
  },
  propositionIcon: {
    fontSize: 35,
    marginRight: 20
  },
  headerText: {
    fontFamily: fonts.header,
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.text.default,
  },
  headerSubtext: {
    fontSize: 18,
    margin: '16px auto'
  },
  loginWithGoogle: {
    margin: '35px 0 60px',
    backgroundColor: '#4885ed !important',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '10px 15px',
    borderRadius: 2,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: '0.9rem',
    fontFamily: 'Roboto, Helvetica, Arial',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      fontWeight: 400,
    }
  },
  googleIcon: {
    fontSize: '1.1rem',
    marginRight: 10
  },
  footerContainer: {
    textAlign: 'center',
    padding: 11,
    borderTop: '1px solid #e6ecf0'
  },
  footerList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 'auto',
    margin: 0,
    padding: 0,
  },
  footerListItem: {
    display: 'inline-block',
    listItemStyle: 'none'
  },
  footerLink: {
    display: 'block',
    textDecoration: 'none',
    padding: '10px 20px',
    color: 'gray',
    transition: 'color 300ms',
    '&:hover': {
      color: colors.primary,
    }
  }
});

export default styles;
