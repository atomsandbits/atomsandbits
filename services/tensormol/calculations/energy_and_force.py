from TensorMol import PARAMS, JOULEPERHARTREE


def main(manager, molecule):
    if (hasattr(manager, 'get_energy_force_function')):
        energy, force = manager.get_energy_force_function(molecule)(
            molecule.coords)
        return energy, (-1.0 * force / JOULEPERHARTREE)
    else:
        (Etotal, Ebp, Ebp_atom, Ecc, Evdw, mol_dipole, atom_charge,
         gradient) = manager.EvalBPDirectEEUpdateSingle(
             molecule, PARAMS["AN1_r_Rc"], PARAMS["AN1_a_Rc"],
             PARAMS["EECutoffOff"], True)
        energy = Etotal
        return energy[0], (-1.0 * gradient[0] / JOULEPERHARTREE)


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from networks import tensormol01, tensormol02, ani1
    from TensorMol import Mol
    molecule = Mol()
    molecule.FromXYZString("""12
        benzene
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
    energy, force = main(tensormol01.main(), molecule)
    print(energy)
    print(force)
    energy, force = main(ani1.main(), molecule)
    print(energy)
    print(force)
    energy, force = main(tensormol02.main(), molecule)
    print(energy)
    print(force)
