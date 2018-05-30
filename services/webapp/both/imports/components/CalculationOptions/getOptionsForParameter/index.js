import calculationOptions from '../options';

const getOptionsForParameter = ({ type, method, parameter }) => {
  if (!type || !method) {
    throw new Error(
      'Type and Method must be defined for getOptionsForParameter'
    );
  }
  const options = calculationOptions
    .find((option) => option.value === type)
    .methods.find((methodOption) => methodOption.value === method)
    ? calculationOptions
        .find((option) => option.value === type)
        .methods.find((methodOption) => methodOption.value === method)[
        parameter
      ]
    : null;
  return options;
};

export { getOptionsForParameter };
export default getOptionsForParameter;
