# -----------------------
#     Argument Parser
# -----------------------
import sys, argparse

parser = argparse.ArgumentParser()
parser.add_argument('--atomic-coords', help='atomic coordinates')
parser.add_argument('--density-fit', help='density fitting method')
parser.add_argument('--basis-set', help='basis set')
parser.add_argument('--aux-basis-set', help='auxiliary basis set')
parser.add_argument('--pseudo-potential', help='pseudo potential')
parser.add_argument('--functional', help='dft functional')
parser.add_argument('--charge', help='charge')
parser.add_argument('--multiplicity', help='multiplicity')
parser.add_argument('--k-points', help='k-points [3x1]')
parser.add_argument('--lattice-vectors', help='lattice vectors [3x3]')
parser.add_argument('--frozen-cores', help='number of frozen cores')
results, remaining = parser.parse_known_args()

atomic_coords    = results.atomic_coords.replace('\\n', '\n')
density_fit      = results.density_fit.upper() if results.density_fit != 'undefined' else None
basis_set        = results.basis_set
aux_basis_set    = results.aux_basis_set if results.aux_basis_set != 'undefined' else None
pseudo_potential = results.pseudo_potential if results.pseudo_potential != 'undefined' else None
functional       = results.functional
charge           = int(results.charge) if results.charge is not None else 0
multiplicity     = int(results.multiplicity) if results.multiplicity is not None else 1
spin             = (multiplicity - 1)/2
flat_lattice_vectors = [float (lattice_vector) for lattice_vector in results.lattice_vectors.split(",")]
lattice_vectors  = [flat_lattice_vectors[0:3], flat_lattice_vectors[3:6], flat_lattice_vectors[6:9]]
num_frozen_cores = int(results.frozen_cores) if results.frozen_cores is not None else 0

sys.argv = [sys.argv[0]]

# -----------------------
#     PYSCF
# -----------------------
from pyscf.pbc import gto, scf, df, cc

cell = gto.M(atom=atomic_coords, basis=basis_set, spin=spin, charge=charge, a=lattice_vectors, pseudo=pseudo_potential, precision=1e-6, verbose=5)

mf = scf.RHF(cell)
mf.with_df = getattr(df, density_fit)(cell)
if density_fit == "gdf" or density_fit == "mdf":
    mf.with_df.auxbasis = aux_basis_set
mf.kernel()

my_cc = cc.CCSD(mf)
my_cc.kernel()
