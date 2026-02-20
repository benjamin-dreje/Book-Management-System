require("dotenv").config(); // חייב להיות בשורה הראשונה
const mongoose = require("mongoose");
// ... שאר ה-requires (cors וכו')

// שימוש בכתובת מה-env
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log("Connected to MongoDB Atlas via Environment Variables!"),
  )
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// ... המשך הקוד שלך

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let books = [
  {
    id: 28,
    Image: "the hubbit.png",
    info: "The story is told in the form of a picaresque or episodic journey; [1] several chapters introduce a new type of monster or threat as Bilbo progresses through the landscape. Bilbo acquires a new level of maturity, skill, and wisdom by embracing the unrefined, romantic, fairy-like, and adventurous aspects of his nature and applying his insight and common sense.",
    title: "The Hobbit",
    price: 34.0,
  },
  {
    id: 27,
    Image: "galaxy.jpg",
    info: "“The Hitchhiker’s Guide to the Galaxy” is a humorous sci‑fi story about Arthur Dent, an ordinary man who escapes Earth moments before it’s destroyed. He travels through space with quirky aliens, bizarre technologies, and a sarcastic electronic guidebook, all wrapped in sharp, witty humor about life and the universe.",
    title: "The Hitchhikers Guide to the Galaxy",
    price: 13.95,
  },
  { id: 26, title: "The Lord Of The Rings", price: 32.55 },
  { id: 25, title: "The Catcher in the Rye", price: 4.55 },
  { id: 24, title: "Effective Modern C++", price: 34.0 },
];

// GET - קבלת כל הספרים
app.get("/book", (req, res) => {
  res.json(books);
});

// POST - הוספת ספר חדש (באמצעות push)
app.post("/book", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

// DELETE - מחיקה באמצעות filter
// התיקון ב-server.js
app.delete("/book/:id", (req, res) => {
  const idToDelete = Number(req.params.id);

  // הוספת בדיקה ש-book קיים לפני שבודקים את ה-id שלו
  books = books.filter((book) => book && book.id !== idToDelete);

  res.json({ success: true });
});

// UPDATE - עדכון באמצעות map (כפי שנתבקשת ברמז)
app.put("/book/:id", (req, res) => {
  const idToUpdate = Number(req.params.id);
  const newData = req.body;

  books = books.map((book) => {
    // אם מצאנו את הספר שצריך לעדכן
    if (book.id === idToUpdate) {
      // אנחנו מעדכנים את השדות שלו
      book.title = newData.title;
      book.price = Number(newData.price);
      book.id = Number(newData.id);

      return book; // מחזירים את הספר המעודכן
    }

    // אם זה לא הספר הנכון, מחזירים אותו כמו שהוא
    return book;
  });

  const updatedBook = books.find((b) => b.id === Number(newData.id));
  res.json({ success: true, message: "Book updated successfully" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
