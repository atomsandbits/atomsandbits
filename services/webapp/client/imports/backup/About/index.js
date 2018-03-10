import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import MailIcon from 'material-ui-icons/Mail';

import styles from './styles';

class AboutPage extends React.Component {
  state = {};

  render() {
    const {classes, theme} = this.props;
    return (<div className={classes.container}>
      <Typography className={classes.title} type="display3">About</Typography>
      <div style={{display: 'block', textAlign: 'center'}}>
        <Typography className={classes.text} type="display1">Run Calculations.</Typography>
        <Typography className={classes.text} type="display1">Store Calculations.</Typography>
        <Typography className={classes.text} type="display1">Learn from Calculations.</Typography>
      </div>
      <div style={{display: 'block', textAlign: 'center', padding: '30px 0 0', width: 'fit-content', margin: '0 auto'}}>
        <Link to="https://github.com/cloudszi/cloudszi" target="_blank" className={classes.githubLink}>
          <Typography className={classes.github} type="display1">
            Contribute on GitHub
          </Typography>
        </Link>
      </div>
      <div style={{display: 'block', textAlign: 'center', padding: '40px 0'}}>
        <Typography className={classes.contact} type="subheading">
          contact
        </Typography>
        <Link className={classes.footerLink} to="mailto:jordangarside@gmail.com" target="_blank">
          <MailIcon className={classes.icon} />
        </Link>
      </div>
    </div>)
  }
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(AboutPage);
