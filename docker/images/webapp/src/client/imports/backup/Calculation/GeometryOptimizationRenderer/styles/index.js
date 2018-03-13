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
  },
  geometryTextareaContainer: {
    textAlign: 'center'
  },
  geometryTextarea: {
    width: '100%',
    whiteSpace: 'pre',
    textAlign: 'left',
    fontFamily: 'Space Mono, monospace',
    overflow: 'auto',
    minHeight: 275,
    height: '40vh',
    maxHeight: 375,
    padding: '15px 15px 15px 25px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.drawer,
    border: 'none',
    color: theme.palette.common.white
  },
  stepper: {
    userSelect: 'none'
  }
});

export default styles;
