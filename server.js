const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "./db/db.sqlite";
const db = new sqlite3.Database(DB_PATH);

app.use(bodyParser.json()); // Parse JSON request bodies

// Assuming you have an array of image objects
let images = [
  // {"id": 1, "url": "https://i.redd.it/p4gceo1w5sj71.jpg", "rating": 0},
  
];

// Retrieve all images
app.get("/images", (req, res) => {
  
  db.all("SELECT * FROM images", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error retrieving images from the database" });
    } else {
      res.json(rows);
    }
  });
});


// Retrieve a specific image by ID
app.get("/images/:id", (req, res) => {
  const { id } = req.params;
  const image = images.find((img) => img.id === parseInt(id));

  
  if (!image) {
    res.status(404).json({ error: "Image not found" });
  } else {
    res.json(image);
  }
});

// Update the rating of an image by ID
app.post("/images/:id/rating", (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  const image = images.find((img) => img.id === parseInt(id));

  if (!image) {
    res.status(404).json({ error: "Image not found" });
  } else {
    image.rating = rating;
    res.json(image);
  }
});

app.delete("/images/delete/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM images WHERE id = ?", id, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while deleting the image" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Image not found" });
    } else {
      res.sendStatus(204);
    }
  });
});

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS images (
//       id INTEGER PRIMARY KEY,
//       url TEXT,
//       rating INTEGER
//     )
//   `);

//   const insertStatement = db.prepare(
//     "INSERT INTO images (id, url, rating) VALUES (?, ?, ?)"
//   );

//   images.forEach((image) => {
//     insertStatement.run(image.id, image.url, image.rating);
//   });

//   insertStatement.finalize();
// });

// const imageId = 1386; // Replace with the actual ID of the image you want to delete

// db.run("DELETE FROM images WHERE id = ?", imageId, function (err) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   if (this.changes === 0) {
//     console.log("Image not found");
//   } else {
//     console.log("Image deleted successfully");
//   }
// });

const port = process.env.PORT; // Use environment variable for port or fallback to 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
