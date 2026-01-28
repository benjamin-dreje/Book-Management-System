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

function getBook() {
  const tableBody = document.getElementById("table-body");
  const showDate = document.querySelector(".showDate");
  const Selected = document.getElementById("selected");
  tableBody.innerHTML = "";
  books.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td class="read-btn">Read</td>
        <td class="action-link">Update</td>
        <td class="delete-icon">🗑️</td>
    `;

    const readBtn = tr.querySelector(".read-btn");
    readBtn.addEventListener("click", () => {
      showDate.innerHTML = `
        <div style="box-shadow: 0px 0 80px 0.5px #8f8e8e70;
    padding: 10px;
    margin-top: 10px;
    background: white;
    border-radius: 4px;
    margin-left: 20px;
    height: 100vh;
}">
          <h3>Selected Book Details:</h3>
          <div class="container2">
          <div class="imageCon">
          <img src="${book.Image}" class="bookImg"/>
          </div>
          <div class="infoCon">
          <span class="info"> ${book.info}</span>
          </div>
          </div>
          <p><strong>ID:</strong>${book.id}</p>
          <p><strong>Title:</strong>${book.title}</p>
          <p><strong>Price:</strong>$${book.price}</p>
        </div>
      `;
    });

    const deleteBook = tr.querySelector(".delete-icon");
    deleteBook.addEventListener("click", () => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        console.log("Deleted index:", index);
        tr.remove();
      }
    });

    tableBody.appendChild(tr);
  });
}
