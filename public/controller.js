// הוספת async לפני הפונקציה
async function init() {
  const allBooks = await getBooksMode(); // מחכה לשרת שיחזיר תשובה
  getBook(allBooks);
}
async function addNewBook() {
  // 1. קבלת נתונים מהמשתמש
  const id = prompt("Enter Book ID:");
  const title = prompt("Enter Book Title:");
  const price = prompt("Enter Book Price:");

  // בדיקת תקינות בסיסית
  if (!id || !title || !price || isNaN(price)) {
    alert("Invalid input!");
    return;
  }

  const newBook = {
    id: Number(id),
    title: title,
    price: Number(price),
    Image: "", // אפשר להוסיף פרומפט גם לזה
    info: "New book added to system",
  };

  // 2. שליחה לשרת דרך המודל
  const savedBook = await addBookModel(newBook);

  if (savedBook) {
    // 3. עדכון ה-UI: במקום לצייר שורה אחת, נרענן את כל הטבלה מהשרת
    // כדי לוודא שהכל מסונכרן
    const allBooks = await getBooksMode();
    getBook(allBooks);

    alert(`Book "${savedBook.title}" added successfully!`);
  }
}
