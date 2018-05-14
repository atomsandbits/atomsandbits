from TensorMol import Mol, PARAMS
from TensorMol.Simulations import RelaxedScan


def main(manager,
         molecule,
         on_step,
         steps=20,
         atom_one=1,
         atom_two=1,
         final_distance=10):
    """main."""

    def EnAndForce(x_, DoForce=True):
        """Calculate energy and force."""
        mtmp = Mol(molecule.atoms, x_)
        (Etotal, Ebp, Ebp_atom, Ecc, Evdw, mol_dipole, atom_charge,
         gradient) = manager.EvalBPDirectEEUpdateSingle(
             mtmp, PARAMS["AN1_r_Rc"], PARAMS["AN1_a_Rc"],
             PARAMS["EECutoffOff"], True)
        energy = Etotal[0]
        force = gradient[0]
        if DoForce:
            return energy, force
        else:
            return energy

    # Perform geometry optimization
    PARAMS["OptMaxCycles"] = 2000
    PARAMS["OptThresh"] = 0.001
    scanner = RelaxedScan(
        EnAndForce, molecule, at1=atom_one - 1, at2=atom_two - 1, nstep_=steps)
    return scanner.Scan(molecule, maxr=final_distance, callback=on_step)


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from networks import tensormol01
    molecule = Mol()

    def on_step(mol_hist):
        return

    molecule.FromXYZString("""12

    C     0.00000     1.40272      0
    H     0.00000     2.49029      0
    C    -1.21479     0.70136      0
    H    -2.15666     1.24515      0
    C    -1.21479    -0.70136      0
    H    -2.15666    -1.24515      0
    C     0.00000    -1.40272      0
    H     0.00000    -2.49029      0
    C     1.21479    -0.70136      0
    H     2.15666    -1.24515      0
    C     1.21479     0.70136      0
    H     2.15666     1.24515      0""")
    print(main(tensormol01.main(), molecule, on_step))
