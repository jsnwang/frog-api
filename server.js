const express = require('express');
const app = express();

// Assuming you have an array of image objects
const images = [
    { id: 1, url: 'https://example.com/image1.jpg', rating: 0 },
    { id: 2, url: 'https://example.com/image2.jpg', rating: 0 },
    // Add more image objects as needed
  ];
  
  app.get('/images', (req, res) => {
    // Return all images
    res.json(images);
  });
  
  app.get('/images/:id', (req, res) => {
    const { id } = req.params;
  
    // Find the image by its ID
    const image = images.find((img) => img.id === parseInt(id));
  
    if (!image) {
      // If the image is not found, return a 404 status code and an error message
      res.status(404).json({ error: 'Image not found' });
    } else {
      // If the image is found, return it
      res.json(image);
    }
  });

  app.post('/images/:id/rating', (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
  
    // Find the image by its ID
    const image = images.find((img) => img.id === parseInt(id));
  
    if (!image) {
      // If the image is not found, return a 404 status code and an error message
      res.status(404).json({ error: 'Image not found' });
    } else {
      // Update the rating of the image
      image.rating = rating;
  
      // Return the updated image
      res.json(image);
    }
  });
  
  


  const port = 3000; // Change this if you want to use a different port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
