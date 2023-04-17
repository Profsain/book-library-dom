// bookstore
let bookStore = [
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: 336,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTyU6AhVRhIrElP0KomBZftYmGSFhNb6N9QsMIG_97&s',
        isRead: true
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        pages: 180,
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        isRead: false
      },
      {
        title: '1984',
        author: 'George Orwell',
        pages: 328,
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        isRead: true
      },
      {
        title: '1984',
        author: 'George Orwell',
        pages: 328,
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
        isRead: true
      }
];

// library constructor
class Book {
    constructor(title, author, pages, image, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.image = image;
        this.isRead = isRead;
    }
}

// get book detail
const getBookInfo = () => {
    const form = document.getElementById('addBookForm');
    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const pages = form.elements['pages'].value;
    const image = form.elements['image'].value;
    const isRead = form.elements['isRead'].value;

    // // create book obj
    const newBook = new Book(title, author, pages, image, isRead);

    form.reset();
    return newBook
}

// add new book to store
const addNewBook = (event) => {
  event.preventDefault();
  let newBook = getBookInfo();
  bookStore.push(newBook);


  renderBook(bookStore);
}

// hook addBtn to addNewBook
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addNewBook)

// render book list
const renderBook = (books) => {
  const gridDiv = document.getElementById('grid');

  bookStore.forEach((book) => {
    const cardCol = document.createElement('div');
    cardCol.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm', 'm-2');

    const image = document.createElement('img');
    image.src = book.image;
    image.classList.add('card-img-top', 'mx-5');
    image.style.width = '100px';
    image.style.width = '155px'
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.title;
    cardBody.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('card-text');
    author.textContent = `Author: ${book.author}`;
    cardBody.appendChild(author);

    const pages = document.createElement('p');
    pages.classList.add('card-text');
    pages.textContent = `Pages: ${book.pages}`;
    cardBody.appendChild(pages);

    const isRead = document.createElement('p');
    isRead.classList.add('card-text', 'isRead');
    isRead.textContent = `Read: ${book.isRead == true ? 'Yes' : 'No'}`;
    cardBody.appendChild(isRead);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btnContainer');

    const readBtn = document.createElement('button');
    readBtn.classList.add('btn', 'btn-primary', 'mr-2', 'readActionBtn');
    readBtn.textContent = `${book.isRead == 'true' ? 'Not Read' : 'Mark Read' }`;
    btnContainer.appendChild(readBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-secondary', 'mx-3', 'removeBookBtn');
    removeBtn.textContent = 'Remove';
    btnContainer.appendChild(removeBtn);

    cardBody.appendChild(btnContainer);

    card.appendChild(cardBody);

    cardCol.appendChild(card);

    gridDiv.appendChild(cardCol);
  });
}

renderBook(bookStore);

// remove book
const removeBook = (event) => {
  const book = event.target.parentElement.parentElement.parentElement.parentElement;
  book.remove();

  // remove book from store
  const title = book.querySelector('.card-title').textContent;
  const author = book.querySelector('.card-text').textContent;
  const pages = book.querySelector('.card-text').textContent;
  const isRead = book.querySelector('.card-text').textContent;

  const bookToRemove = new Book(title, author, pages, isRead);
  const index = bookStore.indexOf(bookToRemove);
  bookStore.splice(index, 1);
  
}


// hook removeBtn to removeBook
const removeBtn = document.querySelectorAll('.removeBookBtn');
removeBtn.forEach((btn) => {
  btn.addEventListener('click', removeBook);
});

// mark book as read
const markAsRead = (event) => {
  const book = event.target.parentElement.parentElement.parentElement;

  const isRead = book.querySelector('.isRead');
  isRead.textContent = `Read: ${isRead.textContent == 'Read: Yes' ? 'No' : 'Yes'}`;
  event.target.textContent = `${event.target.textContent == 'Mark Read' ? 'Not Read' : 'Mark Read' }`;
}

// hook readBtn to markAsRead
const readBtn = document.querySelectorAll('.readActionBtn');
readBtn.forEach((btn) => {
  btn.addEventListener('click', markAsRead);
});