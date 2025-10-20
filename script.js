// グローバル定数・変数
const myLibrary = [];
const btn = document.querySelector("#datasubmit");
const form = document.querySelector("#inputform");
const deleteBtn = document.querySelectorAll(".deletebtn");

// コンストラクタ・オブジェクト
function Book(){
}


//form入力された情報を元にBookインスタンスを生成し配列に追加
function addBookToLibrary(name, author, page, price, read) {
    const currentBook = new Book;
    currentBook.id = "id_" + crypto.randomUUID(); //idが数字から始まると後の関数でバグるので回避
    currentBook.name = name;
    currentBook.author = author;
    currentBook.page = page;
    currentBook.price = price;
    currentBook.read = read;
    myLibrary.push(currentBook);
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

// イベントリスナー系
// btn.addEventListener("click",(event)=>{
//     event.preventDefault;
//     const bookName = document.querySelector("#bookname").value;
//     const author = document.querySelector("#author").value;
//     const page = document.querySelector("#page").valueAsNumber;
//     const price = document.querySelector("#price").valueAsNumber;
//     const read = document.querySelector("input[name='read']:checked").value
//     addBookToLibrary(bookName, author, page, price, read);
//     form.reset();
//     displayBooks();
// } )

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const bookName = document.querySelector("#bookname").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").valueAsNumber;
    const price = document.querySelector("#price").valueAsNumber;
    const read = document.querySelector("input[name='read']:checked").value
    addBookToLibrary(bookName, author, page, price, read);
    form.reset();
    console.log(myLibrary)
    displayBooks();
} )
