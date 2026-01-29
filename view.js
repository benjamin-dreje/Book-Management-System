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
        <td class="delete-icon">🗑️</td>
    `;

    const readBtn = tr.querySelector(".read-btn");
    readBtn.addEventListener("click", () => {
      showDate.innerHTML += `
        <div style="box-shadow: 0px 0 80px 0.5px #8f8e8e70;
    padding: 10px;
    margin-top: 10px;
    background: white;
    border-radius: 4px;
    margin-left: 20px;
    
}">
          
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

    //
    let updateList = tr.querySelector(".action-link");
    updateList.addEventListener("click", () => {
      let newTitle = prompt("What is the new title?"); // לבדוק שזה סטרינג בלבד
      let newPrice = prompt("What is the new price?");
      let newId = prompt("what is the new id?");
      if (
        !newTitle ||
        !newTitle.trim() ||
        isNaN(newPrice) ||
        newPrice.trim() === "" ||
        isNaN(newId) ||
        newId === ""
      ) {
        alert("Invalid information");
      } else {
        // אם הכל תקין - מעדכנים
        book.title = newTitle.trim();
        book.price = Number(newPrice);
        book.id = Number(newId);

        //tr הוא המשתנה שמייצג את השורה הספציפית בטבלה עליה לחצת. כל שורה ב-HTML מורכבת מ"ילדים" (Children)

        // עדכון התצוגה בטבלה באופן מיידי
        tr.children[0].innerText = book.id;

        tr.children[1].innerText = book.title;
        //tr.children[0] – התא הראשון (ה-ID של הספר).
        //tr.children[1] – התא השני (הכותרת).
        tr.children[2].innerText = `$${book.price}`;
        //tr.children[2] – התא השלישי (המחיר).
        //tr.children[3] ומעלה – כפתורי ה-Read, Update וכו'.

        // בתוך ה-else של העדכון המוצלח:
        const msgContainer = document.getElementById("msg");

        // 1. נציג את ההודעה
        msgContainer.innerText = `Book "${book.title}" updated successfully!`;
        msgContainer.classList.remove("hidden");
        // 2. נגדיר טיימר שימחק אותה אחרי 5 שניות
        setTimeout(() => {
          msgContainer.innerText = ""; // מוחק את הטקסט
          msgContainer.classList.add("hidden");
          console.log("Message cleared automatically");
        }, 5000);
      }
    });

    tableBody.appendChild(tr);
  });
}
