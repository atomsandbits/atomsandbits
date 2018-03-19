import React from 'react';

const styles = theme => ({
  container: {
    maxWidth: 1000,
    margin: '0 auto 30px',
    [theme.breakpoints.up('md')]: {
      margin: '40px auto 30px'
    }
  },
  geometryTextareaContainer: {
    textAlign: 'center'
  },
  geometryTextarea: {
  },
  speckContainer: {
    textAlign: 'center',
    overflow: 'hidden',
    userSelect: 'none'
  },
  speckCanvas: {
    minHeight: 275,
    height: '40vh',
    maxHeight: 375,
    // width: '100%'
    // border: '1px solid #000000'
  },
  selectable: {
    transition: 'background-color 300ms'
  },
  parameterContainer: {
    padding: '20px 16px'
  },
  outputContainer: {
    backgroundColor: '#FFF',
    color: 'black',
    border: '1px solid gainsboro',
    padding: '0 8px',
    fontFamily: 'Space Mono, monospace',
    position: 'relative',
    height: 300,
    overflow: 'auto',
    fontSize: 14,
    textOverflow: 'clip',
    marginTop: 30,
    [theme.breakpoints.up('sm')]: {
      height: 350,
    }
  },
  outputLabel: {
    fontSize: '0.63rem',
    display: 'block',
    position: 'absolute',
    top: 15,
    left: 20,
    fontWeight: 'bold'
  },
  outputLinkContainer: {
    position: 'absolute',
    top: 25,
    right: 15,
    zIndex: 1,
  },
  outputLink: {
    color: 'white',
    textDecoration: 'none',
    padding: 15,
    display: 'block',
  },
  output: {
    whiteSpace: 'pre',
    padding: '45px 15px 45px 30px'
  },
  runTimeContainer: {
    padding: '0 15px 40px 65px',
    display: 'block',
  },
  submitButton: {
    color: 'white',
    fontSize: '1.1rem',
    textTransform: 'lowercase',
    letterSpacing: '0.1rem',
    padding: '5px 40px',
    fontWeight: 600,
    marginRight: 15,
    [theme.breakpoints.up('sm')]: {
      marginRight: 0
    }
  }
});

export default styles;
