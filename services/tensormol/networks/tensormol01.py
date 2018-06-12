from TensorMol import (BOHRPERA, Mol, MolDigester, MSet, PARAMS,
                       TensorMolData_BP_Direct_EE_WithEle_Release, TFMolManage)
import numpy as np


def main():
    a = MSet()
    m = Mol()
    m.FromXYZString("""4

    C 1. 0. 0.
    H 0. 1. 0.
    N 0. 0. 1.
    O 1. 1. 0.""")
    a.mols.append(m)
    TreatedAtoms = np.array([1, 6, 7, 8], dtype=np.uint8)
    # PARAMS["networks_directory"] =
    #      "/home/animal/Packages/TensorMol/networks/"
    PARAMS["tf_prec"] = "tf.float64"
    PARAMS["NeuronType"] = "sigmoid_with_param"
    PARAMS["sigmoid_alpha"] = 100.0
    PARAMS["HiddenLayers"] = [2000, 2000, 2000]
    PARAMS["EECutoff"] = 15.0
    PARAMS["EECutoffOn"] = 0
    # when elu is used EECutoffOn should always equal to 0
    PARAMS["Elu_Width"] = 4.6
    PARAMS["EECutoffOff"] = 15.0
    PARAMS["AddEcc"] = True
    PARAMS["KeepProb"] = [1.0, 1.0, 1.0, 0.7]
    # Initialize a digester that apply descriptor for the fragme
    d = MolDigester(
        TreatedAtoms, name_="ANI1_Sym_Direct", OType_="EnergyAndDipole")
    tset = TensorMolData_BP_Direct_EE_WithEle_Release(
        a, d, order_=1, num_indis_=1, type_="mol")
    # WithGrad=True)
    PARAMS["DSFAlpha"] = 0.18
    manager = TFMolManage("chemspider12_solvation", tset, False,
                          'fc_sqdiff_BP_Direct_EE_ChargeEncode' +
                          '_Update_vdw_DSF_elu_Normalize_Dropout', False,
                          False)
    return manager


if __name__ == "__main__":
    print('Loading TensorMol 0.1 Network...')
    print(main())
