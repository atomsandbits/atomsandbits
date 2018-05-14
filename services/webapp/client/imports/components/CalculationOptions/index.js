import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  lifecycle,
  onlyUpdateForPropTypes,
  setPropTypes,
  withHandlers,
  defaultProps,
  pure,
  withProps,
  setStatic,
  renderComponent,
} from 'recompose';
import clone from 'lodash/clone';
import memoize from 'lodash/memoize';

import calculationOptions from './options';
import TypeDropdown from './components/TypeDropdown';
import MethodDropdown from './components/MethodDropdown';
import NetworkDropdown from './components/NetworkDropdown';
import BasisSetDropdown from './components/BasisSetDropdown';
import FunctionalDropdown from './components/FunctionalDropdown';
import NumberOfConformersInput from './components/NumberOfConformersInput';
import AtomOneInput from './components/AtomOneInput';
import AtomTwoInput from './components/AtomTwoInput';
import FinalDistanceInput from './components/FinalDistanceInput';
import NumberOfStepsInput from './components/NumberOfStepsInput';
import ChargeInput from './components/ChargeInput';
import MultiplicityDropdown from './components/MultiplicityDropdown';
import { OptionsContainer } from './styles';

const enhance = compose(
  branch(
    ({ parameters }) => !parameters.type,
    renderComponent(({ parameters, setParameters }) => {
      setParameters({
        type: 'geometryOptimization',
        method: 'machineLearning',
        network: 'tensormol01',
      });
      return null;
    })
  ),
  defaultProps({
    setOutputTypes: () => {},
  }),
  setStatic('hello', 'world'),
  onlyUpdateForPropTypes
);

const CalculationOptionsPure = ({
  parameters,
  inputTypes,
  setParameter,
  unsetParameter,
  setOutputTypes,
}) => (
  <OptionsContainer>
    <TypeDropdown
      type={parameters.type}
      setType={setParameter('type')}
      unsetType={unsetParameter('type')}
    />
    <MethodDropdown
      type={parameters.type}
      method={parameters.method}
      setMethod={setParameter('method')}
      unsetMethod={unsetParameter('method')}
    />
    <NetworkDropdown
      type={parameters.type}
      method={parameters.method}
      network={parameters.network}
      setNetwork={setParameter('network')}
      unsetNetwork={unsetParameter('network')}
    />
    <BasisSetDropdown
      type={parameters.type}
      method={parameters.method}
      basisSet={parameters.basisSet}
      setBasisSet={setParameter('basisSet')}
      unsetBasisSet={unsetParameter('basisSet')}
    />
    <FunctionalDropdown
      type={parameters.type}
      method={parameters.method}
      functional={parameters.functional}
      setFunctional={setParameter('functional')}
      unsetFunctional={unsetParameter('functional')}
    />
    <ChargeInput
      type={parameters.type}
      method={parameters.method}
      charge={parameters.charge}
      setCharge={setParameter('charge')}
      unsetCharge={unsetParameter('charge')}
    />
    <MultiplicityDropdown
      type={parameters.type}
      method={parameters.method}
      multiplicity={parameters.multiplicity}
      setMultiplicity={setParameter('multiplicity')}
      unsetMultiplicity={unsetParameter('multiplicity')}
    />
    <NumberOfConformersInput
      type={parameters.type}
      method={parameters.method}
      numberOfConformers={parameters.numberOfConformers}
      setNumberOfConformers={setParameter('numberOfConformers')}
      unsetNumberOfConformers={unsetParameter('numberOfConformers')}
    />
    <AtomOneInput
      type={parameters.type}
      method={parameters.method}
      atomOne={parameters.atomOne}
      setAtomOne={setParameter('atomOne')}
      unsetAtomOne={unsetParameter('atomOne')}
    />
    <AtomTwoInput
      type={parameters.type}
      method={parameters.method}
      atomTwo={parameters.atomTwo}
      setAtomTwo={setParameter('atomTwo')}
      unsetAtomTwo={unsetParameter('atomTwo')}
    />
    <FinalDistanceInput
      type={parameters.type}
      method={parameters.method}
      finalDistance={parameters.finalDistance}
      setFinalDistance={setParameter('finalDistance')}
      unsetFinalDistance={unsetParameter('finalDistance')}
    />
    <NumberOfStepsInput
      type={parameters.type}
      method={parameters.method}
      numberOfSteps={parameters.numberOfSteps}
      setNumberOfSteps={setParameter('numberOfSteps')}
      unsetNumberOfSteps={unsetParameter('numberOfSteps')}
    />
  </OptionsContainer>
);
CalculationOptionsPure.propTypes = {
  inputTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  parameters: PropTypes.object.isRequired,
  setOutputTypes: PropTypes.func,
  setParameter: PropTypes.func.isRequired,
  unsetParameter: PropTypes.func.isRequired,
};

class _CalculationOptions extends React.Component {
  clonedParameters = {};
  updateOutputTypes = () => {
    const { setOutputTypes, inputTypes, parameters } = this.props;
    let outputTypes = [];
    inputTypes.forEach((inputType) => {
      const { supportedInputTypes } = calculationOptions.find(
        (option) => option.value === parameters.type
      );
      if (supportedInputTypes) {
        if (supportedInputTypes[inputType]) {
          outputTypes = outputTypes.concat(
            supportedInputTypes[inputType].outputTypes
          );
        }
      }
    });
    setOutputTypes(outputTypes);
  };
  setParameter = memoize((parameterType) => (value) => {
    const { setParameters } = this.props;
    if (this.unmounting) return;
    const parameters = this.clonedParameters;
    parameters[parameterType] = value;
    setParameters(parameters);
  });
  unsetParameter = memoize((parameterType) => () => {
    const { setParameters } = this.props;
    if (this.unmounting) return;
    delete this.clonedParameters[parameterType];
    setParameters(this.clonedParameters);
  });
  componentWillMount() {
    const { parameters } = this.props;
    this.clonedParameters = clone(parameters);
    this.updateOutputTypes();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { parameters } = nextProps;
    this.clonedParameters = clone(parameters);
    // console.log('~~~ Diff ~~~');
    // Object.keys(nextProps).forEach(key => {
    //   if (nextProps[key] !== this.props[key]) {
    //     console.log(
    //       key,
    //       JSON.stringify(this.props[key]),
    //       JSON.stringify(nextProps[key])
    //     );
    //   }
    // });
    // console.log('~~~~~~');
    return true;
  }
  componentDidUpdate() {
    const { parameters } = this.props;
    this.clonedParameters = clone(parameters);
    this.updateOutputTypes();
  }
  componentWillUnmount() {
    this.unmounting = true;
  }
  render() {
    return (
      <CalculationOptionsPure
        {...this.props}
        setParameter={this.setParameter}
        unsetParameter={this.unsetParameter}
      />
    );
  }
}
_CalculationOptions.propTypes = {
  inputTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  parameters: PropTypes.object.isRequired,
  setOutputTypes: PropTypes.func.isRequired,
  setParameters: PropTypes.func.isRequired,
};

const CalculationOptions = enhance(_CalculationOptions);

export { CalculationOptions };
export default CalculationOptions;
