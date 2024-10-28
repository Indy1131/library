const formReveal = document.querySelector('#formReveal');
const dialog = document.querySelector('dialog');

const content = document.querySelector('.content');
const emptyLabel = document.querySelector('#emptyLabel');
const bookTemplate = document.querySelector('#template');

const form = document.querySelector('form');

const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;

    this.toggleRead = () => {
        this.read = !this.read;
    }
}

function addBookToLibrary(book) {
    emptyLabel.style.display = "none";
    myLibrary.push(book)

    let newBook = bookTemplate.cloneNode(true);
    newBook.setAttribute('id', `book-${myLibrary.length - 1}`);

    let children = newBook.children;
    children[0].textContent = book.title;
    children[1].textContent = book.author;
    children[2].textContent = book.pages + " pages";
    updateRead(newBook, book.read);

    let buttons = children[3].children;

    buttons[0].addEventListener("click", (e) => {
        book.toggleRead();
        updateRead(newBook, book.read);
    });

    buttons[1].addEventListener("click", (e) => {
        removeBookFromLibrary(book);
    });

    content.appendChild(newBook);
}

function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    const removed = myLibrary.splice(index, 1);

    content.removeChild(document.querySelector(`#book-${index}`));

    if (myLibrary.length == 0) {
        emptyLabel.style.display = "inline";
    } else {
        for (let i = index; i < myLibrary.length; i++) {
            document.querySelector(`#book-${i + 1}`).setAttribute('id', `book-${i}`);
        }
    }
}

function updateRead(bookNode, read) {
    const readButton = bookNode.children[3].children[0];
    if (read) {
        readButton.textContent = "I've read it";
        bookNode.style.borderColor = "#009b00";
    } else {
        readButton.textContent = "I haven't read it"
        bookNode.style.borderColor = "#8b0000";
    }
}

formReveal.addEventListener('click', (e) => {
    dialog.showModal();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Array.from(form.children).filter((node) => node.tagName == "INPUT" || node.className == "read-box");
    let toAdd = new Book(data[1].value, data[0].value, data[2].value, data[3].children[1].checked);
    form.reset();
    addBookToLibrary(toAdd);
    dialog.close();
})

let lotr = new Book("J.R.R. Tolkien", "The Lord of the Rings", 1201, true)

addBookToLibrary(lotr);
addBookToLibrary(new Book("George Orwell", "1984", 329, false));


// closeButton.addEventListener("click", (e) => {
//     dialog.showModal();
// });
