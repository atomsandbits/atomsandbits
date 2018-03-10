import React from 'react';

const styles = theme => ({
  container: {
    margin: '10px 30px',
    whiteSpace: 'pre',
    fontFamily: 'Space Mono',
    fontSize: 14,
    [theme.breakpoints.up('md')]: {
      margin: '30px 40px'
    }
  }
});

export default styles;
