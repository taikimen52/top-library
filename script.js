// グローバル定数・変数
const myLibrary = [];
const btn = document.querySelector("#datasubmit");
const form = document.querySelector("#inputform");
const deleteBtn = document.querySelectorAll(".deletebtn");

// コンストラクタ・オブジェクト
function Book(){
}

// 関数（1関数1タスク）
//form入力された情報を元にBookインスタンスを生成し配列に追加
function addBookToLibrary(name, author, page, price) {
    const currentBook = new Book;
    currentBook.id = crypto.randomUUID();
    currentBook.name = name;
    currentBook.author = author;
    currentBook.page = page;
    currentBook.price = price;
    myLibrary.push(currentBook);
}

//配列のデータを元にBOOKインスタンスをフォーム下部に表示する
function displayBooks(){
    let contents = document.querySelector(".display");
    contents.innerHTML =""
    for(let book of myLibrary){
        const bookInfo = 
        `<div class="bookinfo">
            <h2>${book.name}</h2>
            <div class="details">
                <img src="imgs/book.png" alt="bookimage">
                <p>Author : ${book.author}</p>
                <p>Total Page : ${book.page}</p>
                <p>Price : ¥${book.price}</p>
            </div>
            <div class="delete">
                <button class="deletebtn" id="${book.id}">Delete this book</button>
            </div>
        </div>`
        contents.innerHTML += bookInfo;

        // ここでdeleteBtnにイベントリスナーをくっつける。
        const deleteBtn = document.querySelector(`#${book.id}`);
        deleteBtn.addEventListener("click", deleteBook(book.id));
    }
}

// ライブラリから特定のBookを削除する
function deleteBook(targetId) {
    const taregetIndex = myLibrary.findIndex((book)=>{book.id === targetId});
    if(taregetIndex != -1){
        myLibrary.splice(taregetIndex, 1);
    }
}


// イベントリスナー系
btn.addEventListener("click",(event)=>{
    event.preventDefault;
    const bookName = document.querySelector("#bookname").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").valueAsNumber;
    const price = document.querySelector("#price").valueAsNumber;
    addBookToLibrary(bookName, author, page, price);
    console.log(myLibrary);
    form.reset();
    displayBooks()
} )

// 各BookカードのDeleteボタンに機能を実装
// deleteBtn.forEach(el => {
//     el.addEventListener("click", (event)=> {
//         // idを取得
//         const targetId = event.currentTarget.getAttribute("id");
//         console.log(targetId)
//         deleteBook(targetId);
//         console.log(myLibrary);
//     })
// })


