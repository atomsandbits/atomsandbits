from TensorMol import HarmonicSpectra, MSet, Mol, PARAMS
import numpy as np


def main(manager, molecule):
    """main."""
    m = molecule

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

    def ChargeField(x_):
        m.coords = x_
        Etotal, Ebp, Ebp_atom, Ecc, Evdw, mol_dipole, atom_charge, gradient = manager.EvalBPDirectEEUpdateSingle(
            m, PARAMS["AN1_r_Rc"], PARAMS["AN1_a_Rc"], PARAMS["EECutoffOff"],
            True)
        energy = Etotal[0]
        force = gradient[0]
        return atom_charge[0]

    def DipoleField(x_):
        q = np.asarray(ChargeField(x_))
        dipole = np.zeros(3)
        for i in range(0, q.shape[0]):
            dipole += q[i] * x_[i]
        return dipole

    PARAMS["OptMaxCycles"] = 2000
    PARAMS["OptThresh"] = 0.001
    Opt = GeomOptimizer(EnAndForce)
    molecule = Opt.Opt(molecule, callback=emit_callback)
    # Gotta optimize before running spectra
    w, v, i = HarmonicSpectra(
        EnAndForce,
        molecule.coords,
        molecule.atoms,
        WriteNM_=True,
        Mu=DipoleField)
    return molecule, w, i


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from networks import tensormol01
    from TensorMol import Mol
    molecule = Mol()
    molecule.FromXYZString("""3
        water
        H 0 0 0
        H 0 0 2
        O 0 0.8 0.5""")
    print(main(tensormol01.main(), molecule))
