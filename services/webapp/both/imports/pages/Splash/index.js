/* ~~~ Not being used atm ~~~ */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
// import Button from '@material-ui/core/Button';
//
// import GoogleIcon from 'react-icons/lib/fa/google';
// import CalculateIcon from 'react-icons/lib/go/file-binary';
// import SaveIcon from 'react-icons/lib/md/save';
// import LearnIcon from 'react-icons/lib/go/hubot';

import ResultsFeed from '/both/imports/pages/ResultsFeed';
// import SplashBackground from './background';
import styles from './styles';

class SplashPage extends React.Component {
  state = {
    userId: '',
  };
  componentDidMount() {
    document.title = 'atoms+bits';
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
    Meteor.loginWithGoogle({}, (err) => {
      if (err) {
        // Login Error
      } else {
        // Successful Login
      }
    });
  };
  render() {
    // const { classes } = this.props;
    const { userId } = this.state;
    if (userId) {
      return <ResultsFeed />;
    } else {
      return <Redirect to="/new-calculation" />;
    }
    // return (
    //   <div className={classes.container}>
    //     <div className={classes.contentContainer}>
    //       <div
    //         className={`${classes.sectionContainer} ${classes.firstSection}`}
    //       >
    //         <div>
    //           <div className={classes.proposition}>
    //             <CalculateIcon className={classes.propositionIcon} /> Run
    //             calculations.
    //           </div>
    //           <div className={classes.proposition}>
    //             <SaveIcon className={classes.propositionIcon} /> Save
    //             calulations.
    //           </div>
    //           <div className={classes.proposition}>
    //             <LearnIcon className={classes.propositionIcon} /> Learn from
    //             calculations.
    //           </div>
    //         </div>
    //       </div>
    //       <div className={classes.sectionContainer}>
    //         <div className={classes.secondSection}>
    //           <div className={classes.headerText}>atoms+bits</div>
    //           <div className={classes.headerSubtext}>
    //             molecular discovery with cloud-based quantum simulations and
    //             deep learning
    //           </div>
    //           <div className={classes.loginButtons}>
    //             <Button
    //               variant="raised"
    //               onClick={this.loginWithGoogle}
    //               className={classes.loginWithGoogle}
    //             >
    //               <GoogleIcon className={classes.googleIcon} />
    //               Sign in with Google
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={classes.footerContainer}>
    //       <ul className={classes.footerList}>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/"
    //           >
    //             About
    //           </a>
    //         </li>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/#explore"
    //           >
    //             Explore
    //           </a>
    //         </li>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/#methods"
    //           >
    //             Methods
    //           </a>
    //         </li>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/#pricing"
    //           >
    //             Pricing
    //           </a>
    //         </li>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/#team"
    //           >
    //             Team
    //           </a>
    //         </li>
    //         <li className={classes.footerListItem}>
    //           <a
    //             className={classes.footerLink}
    //             href="https://about.atomsandbits.ai/#contact"
    //           >
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // );
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
