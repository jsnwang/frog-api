const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON request bodies

// Assuming you have an array of image objects
let images = [
  { id: 1, url: 'https://example.com/image1.jpg', rating: 0 },
  { id: 2, url: 'https://example.com/image2.jpg', rating: 0 },
  // Add more image objects as needed
];

// Retrieve all images
app.get('/images', (req, res) => {
  res.json(images);
});

// Retrieve a specific image by ID
app.get('/images/:id', (req, res) => {
  const { id } = req.params;
  const image = images.find((img) => img.id === parseInt(id));

  if (!image) {
    res.status(404).json({ error: 'Image not found' });
  } else {
    res.json(image);
  }
});

// Update the rating of an image by ID
app.post('/images/:id/rating', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  const image = images.find((img) => img.id === parseInt(id));

  if (!image) {
    res.status(404).json({ error: 'Image not found' });
  } else {
    image.rating = rating;
    res.json(image);
  }
});

const port = process.env.PORT || 3000; // Use environment variable for port or fallback to 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
