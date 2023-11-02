export default function getImageColor(imageUrl: string) {
  let blockSize = 5; // only visit every 5 pixels
  let defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  let canvas = document.createElement('canvas');
  let context = canvas.getContext && canvas.getContext('2d');
  let data;
  let width;
  let height;
  let i = -4;
  let length;
  let rgb = { r: 0, g: 0, b: 0 };
  let count = 0;
  let hexColor: string = '#ffffff';

  if (!context) {
    return hexColor;
  }

  const imgEl = new Image();
  imgEl.src = imageUrl;
  imgEl.onload = () => {
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context!.drawImage(imgEl, 0, 0);

    try {
      data = context!.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      hexColor = rgbToHex(defaultRGB.r, defaultRGB.g, defaultRGB.b);
      return hexColor;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
  };

  hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
  return hexColor;
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
