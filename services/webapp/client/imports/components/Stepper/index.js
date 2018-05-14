import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  onlyUpdateForPropTypes,
  defaultProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';

const enhance = compose(
  defaultProps({
    autoplay: false,
    speed: 300,
  }),
  withState('playing', 'setPlaying', ({ autoplay }) => autoplay),
  withHandlers({
    stopPlaying: ({ setPlaying }) => (event) => {
      if (event) event.stopPropagation();
      setPlaying(false);
    },
    startPlaying: ({ setPlaying }) => (event) => {
      if (event) event.stopPropagation();
      setPlaying(true);
    },
  }),
  withHandlers({
    handleBack: ({ activeStep, setStep, stopPlaying }) => (event) => {
      event.stopPropagation();
      stopPlaying();
      setStep(activeStep - 1);
    },
    handleNext: ({ activeStep, setStep, stopPlaying }) => (event) => {
      event.stopPropagation();
      stopPlaying();
      setStep(activeStep + 1);
    },
    handleClick: () => (event) => {
      event.stopPropagation();
    },
    handleText: ({ steps, setStep, stopPlaying }) => (event) => {
      stopPlaying();
      let value = parseInt(event.target.value) - 1 || 0;
      if (value < 0) value = 0;
      if (value > steps - 1) value = steps - 1;
      setStep(value);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { playing, setStep, speed, steps, activeStep } = this.props;
      if (playing) {
        this.timer = window.setTimeout(
          () => setStep(activeStep + 1 >= steps ? 0 : activeStep + 1),
          speed
        );
      }
    },
    componentDidUpdate() {
      const { playing, setStep, speed, steps, activeStep } = this.props;
      clearInterval(this.timer);
      if (playing) {
        this.timer = window.setTimeout(
          () => setStep(activeStep + 1 >= steps ? 0 : activeStep + 1),
          speed
        );
      }
    },
  }),
  onlyUpdateForPropTypes
);

const StepperPure = ({
  activeStep,
  handleBack,
  handleNext,
  handleText,
  handleClick,
  speed,
  playing,
  startPlaying,
  stopPlaying,
  setStep,
  steps,
}) => {
  return (
    <div onClick={handleClick}>
      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        <KeyboardArrowLeft />
        Back
      </Button>
      {!playing ? (
        <Button onClick={startPlaying}>
          <PlayArrow />
        </Button>
      ) : (
        <Button onClick={stopPlaying}>
          <Pause />
        </Button>
      )}
      <input
        value={activeStep + 1}
        onChange={handleText}
        onClick={handleClick}
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
};
StepperPure.propTypes = {
  steps: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleText: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  startPlaying: PropTypes.func.isRequired,
  stopPlaying: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
};

const Stepper = enhance(StepperPure);

export { Stepper };
export default Stepper;
