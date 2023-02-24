// Load the model
async function loadModel() {
  const model = await tf.loadLayersModel('model.json');
  return model;
}

// Generate the image
function generateImage(model) {
  // Create a noise tensor
  const noise = tf.randomNormal([1, 100]);

  // Generate an image from the noise tensor
  const output = model.predict(noise);

  // Reshape the output to a 128x128 grayscale image
  const image = output.reshape([128, 128]).arraySync();

  return image;
}

// Draw the image on the canvas
function drawImage(image) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Create a new ImageData object from the generated image array
  const imageData = new ImageData(new Uint8ClampedArray(image.flat().map(pixel => [pixel, pixel, pixel, 255]).flat()), 128, 128);

  // Draw the ImageData onto the canvas
  ctx.putImageData(imageData, 0, 0);
}

// Load the model when the page is loaded
window.addEventListener('load', async () => {
  const model = await loadModel();

  // Generate and draw an image when the button is clicked
  document.getElementById('generate-btn').addEventListener('click', () => {
    const image = generateImage(model);
    drawImage(image);
  });
});
