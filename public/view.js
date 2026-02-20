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

    // כפתור READ
    tr.querySelector(".read-btn").addEventListener("click", () => {
      const currentBook = getBookById(book.id);
      if (currentBook) {
        showDate.innerHTML = `
          <div style="box-shadow: 0px 0 80px 0.5px #8f8e8e70; padding: 10px; margin-top: 10px; background: white; border-radius: 4px; margin-left: 20px;">
            <div class="container2">
              <div class="imageCon"><img src="${currentBook.Image || ""}" class="bookImg" style="width:100px"/></div>
              <div class="infoCon"><span class="info">${currentBook.info || "No info"}</span></div>
            </div>
            <p><strong>ID:</strong> ${currentBook.id}</p>
            <p><strong>Title:</strong> ${currentBook.title}</p>
            <p><strong>Price:</strong> $${currentBook.price}</p>
          </div>
        `;
      }
    });

    // כפתור DELETE - הוספתי async
    const deleteBookBtn = tr.querySelector(".delete-icon");
    deleteBookBtn.addEventListener("click", async () => {
      let ok = confirm("Are you sure you want to delete this book?");
      if (ok) {
        const success = await deleteBookById(book.id); // חייב await
        if (success) {
          tr.remove();
          console.log("Book removed from UI");
        }
      }
    });

    // כפתור UPDATE - הוספתי async
    let updateList = tr.querySelector(".action-link");
    updateList.addEventListener("click", async () => {
      let newTitle = prompt("What is the new title?", book.title);
      let newPrice = prompt("What is the new price?", book.price);
      let newId = prompt("What is the new id?", book.id);

      if (!newTitle || isNaN(newPrice) || isNaN(newId)) {
        alert("Invalid information");
        return;
      }

      // קריאה לשרת עם await
      const updatedBook = await updateBookModel(book.id, {
        id: newId,
        title: newTitle.trim(),
        price: newPrice,
      });

      if (updatedBook) {
        // עדכון התצוגה בטבלה
        tr.children[0].innerText = updatedBook.id;
        tr.children[1].innerText = updatedBook.title;
        tr.children[2].innerText = `$${updatedBook.price}`;

        const msgContainer = document.getElementById("msg");
        msgContainer.innerText = `Book updated successfully!`;
        msgContainer.classList.remove("hidden");
        setTimeout(() => msgContainer.classList.add("hidden"), 3000);
      }
    });

    tableBody.appendChild(tr);
  });
}
