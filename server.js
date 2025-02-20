const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3005;

// Middleware to serve static files from the 'public' folder
app.use(express.static("public"));

// Route to serve the tax brackets JSON
app.get("/tax_brackets", (req, res) => {
  fs.readFile("tax_brackets.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load tax data" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
