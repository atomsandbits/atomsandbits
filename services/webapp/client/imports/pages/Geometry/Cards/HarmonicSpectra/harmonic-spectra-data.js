const wavelengths = `-2.569616706013247835e+02
-1.999654887361659519e+02
-1.396685443489525085e+02
-2.167174253557985253e+01
-1.141458599569485166e+01
-3.495981414427210332e+00
6.257082108443544399e+00
2.609769559299444452e+01
1.882095324269785976e+02
2.223809718638769084e+02
3.802969760815904579e+02
6.266266381839149062e+02
1.632201684433702894e+03
1.691129990173533997e+03
3.699547112953592205e+03
3.819821930036266167e+03
3.878403283463839216e+03
3.915923198229327681e+03`.split('\n');
const intensities = `1.683964674315208132e+00
1.827510465716940313e+00
4.829117525761926766e-01
4.030923620469079038e-01
4.411159649721160814e-02
2.706700357654522049e-02
5.354705815619800399e-03
2.334018976463598516e-01
4.675437823283989047e+00
2.507105518365543073e+00
2.235201280964084436e+00
5.419701556241026452e+00
2.287976019278938011e+00
2.376077602050298054e+00
7.661448753984242188e+00
6.522553968828546100e-01
1.302662584100372722e+00
1.985139088862631240e+00`.split('\n');
const variance = 1;
const sigma = 15 * (variance ** 0.5);
const twoTimesSigmaSquared = 2 * (sigma ** 2);
const m = sigma * Math.sqrt(2 * Math.PI);
const resolution = 1000;
const vStart = 0;
const vEnd = 4000;

const linspace = function linspace(a, b, n) {
  if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  var i,
    ret = Array(n);
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
    const e = Math.exp(-((xValue - wavelengths[i]) ** 2) / twoTimesSigmaSquared);
    y[j] += (e / m) * intensities[i];
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

export { data };
