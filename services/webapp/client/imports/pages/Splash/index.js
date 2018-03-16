import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withTracker } from 'meteor/react-meteor-data';
import Button from 'material-ui/Button';

import GoogleIcon from 'react-icons/lib/fa/google';
import CalculateIcon from 'react-icons/lib/go/file-binary';
import SaveIcon from 'react-icons/lib/md/save';
import LearnIcon from 'react-icons/lib/go/hubot';

import ResultsFeed from '/client/imports/pages/ResultsFeed';
// import SplashBackground from './background';
import styles from './styles';

class SplashPage extends React.Component {
  state = {
    userId: Meteor.userId(),
  };
  componentDidMount() {
    setTimeout(() => {
      this.tracker = Tracker.autorun(() => {
        this.setState({ userId: Meteor.userId() });
      });
    }, 0);
  }
  componentWillUnmount() {
    if (this.tracker) {
      this.tracker.stop();
    }
  }
  tracker = null;
  loginWithGoogle = () => {
    Meteor.loginWithGoogle({}, err => {
      if (err) {
        // Login Error
      } else {
        // Successful Login
      }
    });
  };
  render() {
    const { classes, theme } = this.props;
    const { userId } = this.state;
    if (userId) {
      return <ResultsFeed />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.contentContainer}>
          <div
            className={`${classes.sectionContainer} ${classes.firstSection}`}
          >
            <div>
              <div className={classes.proposition}>
                <CalculateIcon className={classes.propositionIcon} /> Run
                calculations.
              </div>
              <div className={classes.proposition}>
                <SaveIcon className={classes.propositionIcon} /> Save
                calulations.
              </div>
              <div className={classes.proposition}>
                <LearnIcon className={classes.propositionIcon} /> Learn from
                calculations.
              </div>
            </div>
          </div>
          <div className={classes.sectionContainer}>
            <div>
              <div className={classes.logo} />
              <div className={classes.headerText}>cloudszi</div>
              <div className={classes.loginButtons}>
                <Button
                  raised
                  onClick={this.loginWithGoogle}
                  className={classes.loginWithGoogle}
                >
                  <GoogleIcon className={classes.googleIcon} />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footerContainer}>
          <ul className={classes.footerList}>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/"
              >
                About
              </a>
            </li>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/#explore"
              >
                Explore
              </a>
            </li>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/#methods"
              >
                Methods
              </a>
            </li>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/#pricing"
              >
                Pricing
              </a>
            </li>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/#team"
              >
                Team
              </a>
            </li>
            <li className={classes.footerListItem}>
              <a
                className={classes.footerLink}
                href="https://about.cloudszi.com/#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(withStyles(styles, { withTheme: true })(SplashPage));
