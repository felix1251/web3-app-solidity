const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

export const compres = async (input) => {
  const files = await imagemin(["./input/*.{jpeg,jpg,png}"], {
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
    ],
  });
  console.log(files);
  return files
}