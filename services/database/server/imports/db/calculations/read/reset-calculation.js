import { Calculations } from '/server/imports/db';

const resetCalculation = ({ calculationId }) => {
  console.log(`Reset: Calculation #${calculationId}...`);
  Calculations.update(calculationId, {
    $set: {
      running: false,
    },
    $pop: {
      runs: 1,
    },
  });
};

export { resetCalculation };
