const variance = 1;
const sigma = 15 * variance ** 0.5;
const twoTimesSigmaSquared = 2 * sigma ** 2;
const m = sigma * Math.sqrt(2 * Math.PI);
const resolution = 1000;

const generateData = ({ frequencies, intensities }) => {
  const vStart = frequencies[0] - 50;
  const vEnd = frequencies[frequencies.length - 1] + 100;

  const linspace = function linspace(a, b, n) {
    if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
    if (n < 2) {
      return n === 1 ? [a] : [];
    }
    let i;
    let ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
      ret[i] = (i * b + (n - i) * a) / n;
    }
    return ret;
  };
  const x = linspace(vStart, vEnd, resolution);
  const y = new Array(resolution).fill(0);
  for (let i = 0; i < intensities.length; i += 1) {
    // add gaussian intensity values to the plotting space
    for (let j = 0; j < y.length; j += 1) {
      const xValue = x[j];
      const e = Math.exp(
        -((xValue - frequencies[i]) ** 2) / twoTimesSigmaSquared
      );
      y[j] += e / m * intensities[i];
    }
  }

  const data = [];
  for (let i = 0; i < x.length; i += 1) {
    if (y[i] > 0.000001) {
      data.push({
        x: x[i],
        y: y[i],
      });
    }
  }
  return data;
};

export { generateData };
export default generateData;
