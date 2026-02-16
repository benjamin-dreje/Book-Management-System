const books = [
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

function getBooksMode() {
  return books;
}

function deleteBookById(id) {
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    console.log("Deleted from Model, ID:", id);
    return true; // הצלחנו למחוק
  }
  return false; // הספר לא נמצא
}



function updateBookModel(oldId, newData) {
  const book = books.find((b) => b.id === oldId);
  if (book) {
    book.id = Number(newData.id);
    book.title = newData.title;
    book.price = Number(newData.price);
    return book;
  }
  return null;
}

function getBookById(id) {
  return books.find((b) => b.id === id);
}
