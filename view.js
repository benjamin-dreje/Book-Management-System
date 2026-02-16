// let tableBody = document.getElementById("table-body");
// const readBtn = document.getElementById("read-btn");
// let showDate = document.getElementById("showData");

// function getBook() {
//   books.forEach((book) => {
//     const row = `
//      <tr>
//        <td>${book.id}</td>
//        <td>${book.title}</td>
//        <td>$${book.price}</td>
//         <td class="read-btn">Read</td>
//         <td class="action-link">Update</td>
//         <td class="delete-icon">🗑️</td>
//        </tr>
//     `;
//     tableBody.innerHTML += row;
//   });
// }

function getBook(listBooks) {
  const tableBody = document.getElementById("table-body");
  const showDate = document.querySelector(".showDate");
  const Selected = document.getElementById("selected");
  tableBody.innerHTML = "";
  listBooks.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td class="read-btn">Read</td>
        <td class="action-link">Update</td>
        <td class="delete-icon"><i class="fa-solid fa-trash"></i></td>
    `;
tr.querySelector(".read-btn").addEventListener("click", () => {
      const currentBook = getBookById(book.id); // קריאה למודל
      if (currentBook) {
        showDate.innerHTML = `
          <div style="box-shadow: 0px 0 80px 0.5px #8f8e8e70; padding: 10px; margin-top: 10px; background: white; border-radius: 4px; margin-left: 20px;">
            <div class="container2">
              <div class="imageCon"><img src="${currentBook.Image || ''}" class="bookImg"/></div>
              <div class="infoCon"><span class="info">${currentBook.info || 'No info'}</span></div>
            </div>
            <p><strong>ID:</strong> ${currentBook.id}</p>
            <p><strong>Title:</strong> ${currentBook.title}</p>
            <p><strong>Price:</strong> $${currentBook.price}</p>
          </div>
        `;
      }
    });

    const deleteBook = tr.querySelector(".delete-icon");
    deleteBook.addEventListener("click", () => {
      let ok = confirm("Are you sure you want to delete this book? ");
      if (ok) {
        // 2. קריאה ל-Model לביצוע המחיקה הלוגית
        const success = deleteBookById(book.id);

        if (success) {
          // 3. עדכון ה-DOM (שייך ל-View)
          tr.remove();
          console.log("Book removed from UI");
        }
      } else {
        console.log("Deletion canceled by user");
      }
    });

    //
    let updateList = tr.querySelector(".action-link");

    updateList.addEventListener("click", () => {
      // 1. קלט מהמשתמש (תפקיד ה-View)
      let newTitle = prompt("What is the new title?", book.title);
      let newPrice = prompt("What is the new price?", book.price);
      let newId = prompt("What is the new id?", book.id);

      // 2. בדיקת תקינות הקלט
      if (
        !newTitle ||
        !newTitle.trim() ||
        isNaN(newPrice) ||
        newPrice.trim() === "" ||
        isNaN(newId) ||
        newId === ""
      ) {
        alert("Invalid information");
        return;
      }

      // 3. קריאה ל-Model לביצוע העדכון (חיבור בין השכבות)
      const updatedBook = updateBookModel(book.id, {
        id: newId,
        title: newTitle.trim(),
        price: newPrice,
      });

      // 4. עדכון ה-UI במידה והעדכון במודל הצליח
      if (updatedBook) {
        // עדכון תאי הטבלה
        tr.children[0].innerText = updatedBook.id;
        tr.children[1].innerText = updatedBook.title;
        tr.children[2].innerText = `$${updatedBook.price}`;

        // טיפול בהודעת הצלחה
        const msgContainer = document.getElementById("msg");
        msgContainer.innerText = `Book "${updatedBook.title}" updated successfully!`;
        msgContainer.classList.remove("hidden");

        setTimeout(() => {
          msgContainer.innerText = "";
          msgContainer.classList.add("hidden");
        }, 5000);
      }
    });
    tableBody.appendChild(tr);
  });
}
