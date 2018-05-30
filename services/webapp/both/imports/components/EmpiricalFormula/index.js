import React from 'react';
import PropTypes from 'prop-types';

class EmpiricalFormula extends React.Component {
  render() {
    const empiricalFormulaArray = this.props.formula.split(/(\d+)/);
    return (
      <div className={this.props.className}>
        {empiricalFormulaArray.map((value, index) => {
          // Is odd
          if (index % 2 === 1) {
            return <sub key={index}>{value}</sub>;
          }
          return value;
        })}
      </div>
    );
  }
}

EmpiricalFormula.propTypes = {
  formula: PropTypes.string.isRequired,
  className: PropTypes.string,
};
EmpiricalFormula.defaultProps = {
  className: '',
};

export default EmpiricalFormula;
