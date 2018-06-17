import os
from ase_interface import ANIENS, ensemblemolecule
from ase import Atoms
from ase.units import kJ, mol, eV, Hartree


class ANINetwork():
    def __init__(self):
        # Set locations of all required network files
        rootdir = os.environ.get('ANI_PATH')
        wkdir = rootdir + '/ANI-1x/'  # Note the relative path
        cnstfile = wkdir + 'rHCNO-4.6A_16-3.1A_a4-8.params'  # AEV parameters
        saefile = wkdir + 'sae_6-31gd.dat'  # Atomic shifts
        nnfdir = wkdir + '/train'  # network prefix
        Nn = 5  # Number of networks in the ensemble
        gpu = 0  # GPU ID -- this defaults to 0

        # Initilize network ensemble
        try:
            self.aens = ensemblemolecule(cnstfile, saefile, nnfdir, Nn, gpu)
        except RuntimeError:
            print('Couldn\'t load ASI network (GPU probably not available)!')
        return

    def get_energy_force_function(self, molecule):
        atoms = Atoms(numbers=molecule.atoms, positions=molecule.coords)
        atoms.set_calculator(ANIENS(self.aens))

        def get_energy_and_force(xyz_coords, do_force=True):
            nonlocal atoms
            atoms.set_positions(xyz_coords)
            energy = atoms.get_potential_energy() * (eV / Hartree)
            if (do_force):
                force = atoms.get_forces() * (eV / (kJ / mol) * 1000)
                return energy, force
            else:
                return energy

        return get_energy_and_force


def main():
    network = ANINetwork()
    return network


if __name__ == "__main__":
    print('Loading ANI-1 Network...')
    print(main())
