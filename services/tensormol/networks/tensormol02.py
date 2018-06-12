from TensorMol import UniversalNetwork


def main():
    network = UniversalNetwork(
        name="SF_Universal_master_jeherr_Thu_May_31_16.20.05_2018",
        max_num_atoms=1000)
    return network


if __name__ == "__main__":
    print('Loading TensorMol 0.1 Network...')
    print(main())
