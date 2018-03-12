# -----------------------
#     Argument Parser
# -----------------------
import sys, argparse

parser = argparse.ArgumentParser()
parser.add_argument('--atomic-coords', help='atomic coordinates')
parser.add_argument('--basis-set', help='basis set')
parser.add_argument('--functional', help='dft functional')
parser.add_argument('--charge', help='charge')
parser.add_argument('--multiplicity', help='multiplicity')
results, remaining = parser.parse_known_args()

atomic_coords    = results.atomic_coords.replace('\\n', '\n')
basis_set        = results.basis_set
functional       = results.functional
charge           = int(results.charge) if results.charge is not None else 0
multiplicity     = int(results.multiplicity) if results.multiplicity is not None else 1

sys.argv = [sys.argv[0]]

# -----------------------
#     Psi4
# -----------------------

import os
import psi4
psi4.set_memory(os.environ.get('PSI4_MAX_MEMORY') + " MB")
psi4.core.set_num_threads(int(os.environ.get('OMP_NUM_THREADS')))

molecule = psi4.geometry("""
{charge} {multiplicity}
{atomic_coords}
""".format(charge=charge, multiplicity=multiplicity, atomic_coords=atomic_coords))

psi4.optimize('ccsd/{}'.format(basis_set), molecule=molecule)