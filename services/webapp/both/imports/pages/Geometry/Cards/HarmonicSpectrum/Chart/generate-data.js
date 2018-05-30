const variance = 1;
const sigma = 15 * variance ** 0.5;
const twoTimesSigmaSquared = 2 * sigma ** 2;
const m = sigma * Math.sqrt(2 * Math.PI);
const resolution = 1000;

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

const generateData = ({ frequencies, intensities }) => {
  const vStart = frequencies[0] - 50;
  const vEnd = frequencies[frequencies.length - 1] + 100;

  const x = linspace(vStart, vEnd, resolution);
  const y = new Array(resolution).fill(0);
  /* For each intensity, generate the gaussian and add the value to each y */
  for (let intensity = 0; intensity < intensities.length; intensity += 1) {
    for (let i = 0; i < x.length; i += 1) {
      const e = Math.exp(
        -((x[i] - frequencies[intensity]) ** 2) / twoTimesSigmaSquared
      );
      y[i] += e / m * intensities[intensity];
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
