from TensorMol import PARAMS, NudgedElasticBand


def main(manager, molecule, final_molecule, steps=10):
    if (hasattr(manager, 'get_energy_force_function')):
        energy_force_function = manager.get_energy_force_function(molecule)
    else:

        def energy_force_function(x_, do_force=True):
            """Calculate energy and force."""
            mtmp = Mol(molecule.atoms, x_)
            (Etotal, Ebp, Ebp_atom, Ecc, Evdw, mol_dipole, atom_charge,
             gradient) = manager.EvalBPDirectEEUpdateSingle(
                 mtmp, PARAMS["AN1_r_Rc"], PARAMS["AN1_a_Rc"],
                 PARAMS["EECutoffOff"], True)
            energy = Etotal[0]
            force = gradient[0]
            if do_force:
                return energy, force
            else:
                return energy

    # Finally do the NEB. between each.
    PARAMS["OptMaxCycles"] = 500
    PARAMS["NebSolver"] = "Verlet"
    PARAMS["SDStep"] = 0.05
    PARAMS["NebNumBeads"] = 22
    PARAMS["MaxBFGS"] = 12
    neb = NudgedElasticBand(energy_force_function, molecule, final_molecule)
    Beads = neb.Opt("NebStep1")
    print(Beads)


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
    secondary_molecule = Mol()
    secondary_molecule.FromXYZString("""4

    C 1. 0. 0.
    H 0. 1. 0.
    N 0. 0. 1.
    O 0. 1. 0.""")
    print(main(tensormol01.main(), molecule, secondary_molecule, steps=3))
