// グローバル定数・変数
const myLibrary = [];
const newBookBtn = document.querySelector("#newbookbtn");
const header = document.querySelector(".header");
const deleteBtn = document.querySelectorAll(".deletebtn");

//Bookクラス
class Book {
    constructor(name, author, page, price, read) {
        this.id = "id_" + crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.page = page;
        this.price = price;
        this.read = read;
    }

    addLibrary() {
        myLibrary.push(this);
    }
}

//配列のデータを元にBOOKインスタンスをフォーム下部に表示する
function displayBooks(){
    let contents = document.querySelector(".display");
    contents.innerHTML =""
    for(let book of myLibrary){
        const bookInfo = 
        `<div class="bookinfo" data-book-id="${book.id}">
            <h2>${book.name}</h2>
            <div class="details">
                <img src="imgs/book.png" alt="bookimage">
                <p>Author : ${book.author}</p>
                <p>Total Page : ${book.page}</p>
                <p>Price : ¥${book.price}</p>
                <p class="read">${book.read}</p>
            </div>
            <div class="managebtns">
                <button class="markreadbtn">Mark Read</button>
                <button class="deletebtn">Delete this book</button>
            </div>
        </div>`

        contents.innerHTML += bookInfo;
    }
    // ここでボタン機能を設置
    setManageBtns();
}

// ライブラリから特定のBookを削除する
function deleteBook(targetId) {
    const taregetIndex = myLibrary.findIndex((book)=> book.id === targetId);
    if(taregetIndex != -1){
        myLibrary.splice(taregetIndex, 1);
    }
    // 削除後、ディスプレイを更新
    displayBooks();
}

function markRead(targetId) {
    const taregetIndex = myLibrary.findIndex((book) => book.id === targetId);
    const targetObj = myLibrary[taregetIndex];
    if(taregetIndex != -1){
        if(targetObj.read === "Read"){
            targetObj.read = "Unread"
        }else {
            targetObj.read = "Read"
        }
    }
    displayBooks();
}

// 各BookカードのDelete・mark readボタンに機能を実装
function setManageBtns() {
    // 全てのボタンノードを配列に
    const deleteBtns = document.querySelectorAll(".deletebtn");
    const markReadBtns = document.querySelectorAll(".markreadbtn");

    // 各ボタンにリスナー配置
    deleteBtns.forEach(el => {
        el.addEventListener("click", (event)=> {
            // idを取得
            const target = event.target.closest(".bookinfo");
            const targetId = target.dataset.bookId
            deleteBook(targetId);
        })
    })

    markReadBtns.forEach(el => {
        el.addEventListener("click", (event)=> {
            // idを取得
            const target = event.target.closest(".bookinfo");
            const targetId = target.dataset.bookId
            markRead(targetId);
        })
    })
}

function setForm(){
    header.innerHTML = `
        <h2>Input Book Information</h2>
        <form id="inputform">
            <div class="inputinfo">
                <div class="bookname">
                    <label for="bookname">Book Name:</label>
                    <input type="text" name="bookname" id="bookname" placeholder="Alice in Wonderland" required>
                </div>
                <div class="author">
                    <label for="author">Author:</label>
                    <input type="text" name="author" id="author" placeholder="Louis Carol" required>
                </div>
                <div class="page">
                    <label for="page">Total Page:</label>
                    <input name="page" id="page" type="number" min="1" max="10000" placeholder="160">
                </div>
                <div class="price">
                    <label for="price">Price:</label>
                    <input name="price" id="price" type="number" min="1" max="100000000" placeholder="1200">
                </div>
                <div class="readornot">
                    <label for="read">Read or not:</label>
                    <div class="read">
                        <input type="radio" name="read" value="Read">Read
                    </div>
                    <div class="unread">
                        <input type="radio" name="read" value="Unread" checked>Unread
                    </div>
                </div>
            </div>
            <button id="datasubmit" type="submit">Submit</button>
        </form>
    `
    setSubmitBtn();
}

// イベントリスナー系
function setSubmitBtn(){
    const form = document.querySelector("#inputform");

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const name = document.querySelector("#bookname").value;
        const author = document.querySelector("#author").value;
        const page = document.querySelector("#page").valueAsNumber;
        const price = document.querySelector("#price").valueAsNumber;
        const read = document.querySelector("input[name='read']:checked").value
        const book = new Book(name, author, page, price, read);
        form.reset();
        book.addLibrary();
        console.log(myLibrary)
        displayBooks();
    } )
}

newBookBtn.addEventListener("click", setForm);