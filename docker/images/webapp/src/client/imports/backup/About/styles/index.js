import React from 'react';

const styles = theme => ({
  container: {
    padding: '20px 30px',
    backgroundColor: theme.palette.background.drawer,
    minHeight: '100%',
    boxSizing: 'border-box'
  },
  title: {
    fontFamily: 'Space Mono, Mono',
    fontWeight: 'bold',
    color: theme.palette.common.white,
    margin: '40px 0',
    cursor: 'default',
  },
  text: {
    fontFamily: 'Space Mono, Mono',
    margin: '25px 0',
    color: theme.palette.common.white,
    cursor: 'default',
    fontSize: '1.8rem'
  },
  github: {
    fontFamily: 'Space Mono, Mono',
    color: "#36F1CD",
  },
  githubLink: {
    textDecoration: 'none'
  },
  contact: {
    fontFamily: 'Space Mono, Mono',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    cursor: 'default'
  },
  footerLink: {
    textDecoration: 'none',
    marginTop: 15,
    display: 'inline-block'
  },
  icon: {
    padding: 15,
    height: 36,
    width: 36,
    color: theme.palette.common.white
  }
});

export default styles;
