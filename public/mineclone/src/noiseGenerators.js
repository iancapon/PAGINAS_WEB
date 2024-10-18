const perlinNoise = function (multfactor, gain, x, xscale, y, yscale) {
    return noise(x * xscale, y * yscale) * multfactor + gain
}