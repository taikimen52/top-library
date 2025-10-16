// 必要な定数
const myLibrary = [];
const btn = document.querySelector("#datasubmit");
const form = document.querySelector("#inputform");


function Book(){
}

//form入力された情報を元にインスタンスを生成し配列に追加
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
        </div>`
        contents.innerHTML += bookInfo;
    }
}

btn.addEventListener("click",(e)=>{
    e.preventDefault;
    const bookName = document.querySelector("#bookname").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").valueAsNumber;
    const price = document.querySelector("#price").valueAsNumber;
    addBookToLibrary(bookName, author, page, price);
    console.log(myLibrary);
    form.reset();
    displayBooks()
} )


