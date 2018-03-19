from TensorMol import PARAMS
from TensorMol import GeomOptimizer, MSet, Mol, PARAMS
from TensorMol.Simulations import ScannedOptimization

def main(manager, molecule, on_conformer_found, n_conf=20):
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
    Opt = ScannedOptimization(EnAndForce, molecule, StopAfter_=n_conf)
    return Opt.Search(molecule, callback=on_conformer_found)

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
