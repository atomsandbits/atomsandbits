if (!process.env.OMP_NUM_THREADS) {
  process.env.OMP_NUM_THREADS = 1;
}

if (!process.env.PSI4_MAX_MEMORY) {
  process.env.PSI4_MAX_MEMORY = 4000;
}
