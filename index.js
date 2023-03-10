// Get the form elements
const form = document.querySelector('form');
const photo = document.getElementById('photo');
const watermark1 = document.getElementById('watermark1');
const watermark2 = document.getElementById('watermark2');
const size = document.getElementById('size');
const opacity = document.getElementById('opacity');
const result = document.getElementById('result');

// Handle the form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the selected watermarks and their URLs
  const selectedWatermark1 = watermark1.options[watermark1.selectedIndex].value;
  const selectedWatermark2 = watermark2.options[watermark2.selectedIndex].value;

  // Create the image elements for the photo and watermarks
  const image = new Image();
  const watermarkImage1 = new Image();
  const watermarkImage2 = new Image();

  // Set the image sources to the selected URLs
  image.src = URL.createObjectURL(photo.files[0]);
  watermarkImage1.src = selectedWatermark1;
  watermarkImage2.src = selectedWatermark2;

  // Handle the image load events
  image.onload = () => {
    // Create a canvas element to draw the images on
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the photo on the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Draw the first watermark on the canvas
    ctx.globalAlpha = opacity.value / 100;
    ctx.drawImage(watermarkImage1, 0, 0, watermarkImage1.width * size.value / 100, watermarkImage1.height * size.value / 100);

    // Draw the second watermark on the canvas
    ctx.globalAlpha = opacity.value / 100;
    ctx.drawImage(watermarkImage2, canvas.width - (watermarkImage2.width * size.value / 100), canvas.height - (watermarkImage2.height * size.value / 100), watermarkImage2.width * size.value / 100, watermarkImage2.height * size.value / 100);

    // Set the result image source to the canvas data URL
    result.innerHTML = `<img src="${canvas.toDataURL()}" alt="Watermarked Photo">`;
  };
});
// Get the canvas and download button elements
var canvas = document.getElementById("canvas");
var downloadButton = document.getElementById("downloadButton");

// Add a click event listener to the download button
downloadButton.addEventListener("click", function() {
  // Convert the canvas to a data URL
  var dataURL = canvas.toDataURL("image/png");

  // Create a temporary link element and set its href to the data URL
  var link = document.createElement("a");
  link.href = dataURL;

  // Set the download attribute of the link element to the filename
  link.download = "watermarked-image.png";

  // Append the link element to the document body and click it to trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link element from the document body
  document.body.removeChild(link);
});
