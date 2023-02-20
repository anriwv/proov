const generateBtn = document.getElementById('generate-btn');
const imageContainer = document.getElementById('image-container');

generateBtn.addEventListener('click', generateImage);

async function generateImage() {
  const model = await tf.loadLayersModel('generator_modelKaggle-17.h5');
  const latent = tf.randomNormal([1, 100]);
  const image = model.predict(latent);
  const imageData = await tf.browser.toPixels(image.reshape([128, 128, 1]), {dtype: 'float'});
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const imageDataArray = new ImageData(imageData, 128, 128);
  context.putImageData(imageDataArray, 0, 0);
  imageContainer.innerHTML = '';
  imageContainer.appendChild(canvas);
}
