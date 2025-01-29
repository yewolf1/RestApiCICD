import express from "express";
import path from "path";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Trouver dynamiquement le bon chemin pour index.html
const indexPath = path.join(__dirname, "..", "src", "index.html");

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
