from TensorMol import PARAMS, Mol
from TensorMol.Simulations import ConfSearch
# ScannedOptimization, TopologyMetaOpt


def main(manager, molecule, on_conformer_found=None, n_conf=20):
    """main."""
    if (hasattr(manager, 'GetEnergyForceRoutine')):
        EnAndForce = manager.GetEnergyForceRoutine(molecule)
    else:
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
    Opt = ConfSearch(EnAndForce, molecule, StopAfter_=n_conf)
    return Opt.Search(molecule, callback=on_conformer_found)


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from networks import tensormol01, tensormol02
    molecule = Mol()
    molecule.FromXYZString("""17

    C    -7.079716     0.739119     0.004923
    C    -8.238053     1.731919     0.077636
    C    -7.724415     3.170105     0.092342
    H    -8.833846     1.547485     0.980576
    H    -8.903682     1.588910    -0.783054
    C    -8.864043     4.177735     0.119896
    H    -7.097400     3.358841    -0.788140
    H    -7.075050     3.330803     0.962085
    O    -8.312426     5.486788     0.162899
    H    -9.492618     4.035746     1.004615
    H    -9.484897     4.090243    -0.777434
    H    -9.058605     6.110699     0.167557
    N    -7.585679    -0.628274    -0.011876
    H    -6.410729     0.868898     0.862747
    H    -6.493932     0.913096    -0.904042
    H    -8.045861    -0.833867     0.874128
    H    -6.800998    -1.275620    -0.079674""")
    print(main(tensormol01.main(), molecule, n_conf=5))
    print(main(tensormol02.main(), molecule, n_conf=5))
