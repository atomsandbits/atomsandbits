from TensorMol import PARAMS


def main(manager, molecule):
    (Etotal, Ebp, Ebp_atom, Ecc, Evdw, mol_dipole,
     atom_charge, gradient) = manager.EvalBPDirectEEUpdateSingle(
         molecule, PARAMS["AN1_r_Rc"], PARAMS["AN1_a_Rc"],
         PARAMS["EECutoffOff"], True)
    energy = Etotal
    return energy[0], -1.0 * gradient[0]


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from networks import tensormol01
    from TensorMol import Mol
    molecule = Mol()
    molecule.FromXYZString("""4

    C 1. 0. 0.
    H 0. 1. 0.
    N 0. 0. 1.
    O 1. 1. 0.""")
    print(main(tensormol01.main(), molecule))
