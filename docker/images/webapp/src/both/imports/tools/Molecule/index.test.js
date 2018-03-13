/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { Molecule } from './index';

describe('Molecule', () => {
  it('expect failure', () => {
    expect(() => {
      const molecule = new Molecule({
        xyz: ``,
      });
      console.log(molecule);
      expect(molecule.mass).to.equal();
    }).to.throw();
  });
  it("expect water's mass to be 18.01528", () => {
    const molecule = new Molecule({
      xyz: `3
      water
      H 1.1111111111111111111111111111 0 0
      O 3 0 0
      H 0 0 1`,
    });
    molecule.prettify();
    console.log(molecule);
    console.log(molecule.atomicCoords);
    console.log(molecule.centerOfMass);
    expect(molecule.mass).to.equal(18.01528);
  });
});
