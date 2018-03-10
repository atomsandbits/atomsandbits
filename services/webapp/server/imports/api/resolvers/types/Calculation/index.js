import { getGeometries } from '/server/imports/db/geometries/read';

const Calculation = {
  geometries(calculation) {
    // console.log(calculation);
    return getGeometries({ geometryIds: calculation.geometryIds });
  },
};

export { Calculation };
export default { Calculation };
