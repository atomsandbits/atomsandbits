import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, withHandlers } from 'recompose';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const enhance = compose(
  withHandlers({
    handleBack: ({ activeStep, setStep }) => () => {
      setStep(activeStep - 1);
    },
    handleNext: ({ activeStep, setStep }) => () => {
      setStep(activeStep + 1);
    },
    handleText: ({ steps, setStep }) => event => {
      let value = parseInt(event.target.value) - 1 || 0;
      if (value < 0) value = 0;
      if (value > steps - 1) value = steps - 1;
      setStep(value);
    },
  }),
  onlyUpdateForPropTypes
);

const StepperPure = ({
  activeStep,
  handleBack,
  handleNext,
  handleText,
  setStep,
  steps,
}) => (
  <div>
    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
      <KeyboardArrowLeft />
      Back
    </Button>
    <input
      value={activeStep + 1}
      onChange={handleText}
      type="number"
      style={{ width: 50 }}
    />{' '}
    of {steps}
    <Button
      size="small"
      onClick={handleNext}
      disabled={activeStep === steps - 1}
    >
      Next
      <KeyboardArrowRight />
    </Button>
  </div>
);
StepperPure.propTypes = {
  steps: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleText: PropTypes.func.isRequired,
};

const Stepper = enhance(StepperPure);

export { Stepper };
export default Stepper;
