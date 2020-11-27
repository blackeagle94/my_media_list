// Book Class: Represents a Book
class Book {
    constructor(mType, title, author, pNum, typeOfMedia, rating) {
      this.mType = mType;
      this.title = title;
      this.author = author;
      this.pNum = pNum;
      this.typeOfMedia = typeOfMedia;
      this.rating = rating
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.mType}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td class="text-center">${book.pNum}</td>
        <td>${book.typeOfMedia}</td>
        <td>${book.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 2 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  
    static clearFields() {
      document.querySelector('#mediaTypeSelect').value = '';
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#pNum').value = '';
      document.querySelector('#rating').value = '';
      document.querySelector('#typeOfMedia').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(pNum) {
      const books = JSON.parse(localStorage.getItem('books'));
  
      for (let i = 0; i < books.length; i++) {
        if (books[i] == pNum) {
          books.splice(i, 1)
        }
      }
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const mType = document.querySelector('#mediaTypeSelect').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pNum = document.querySelector('#pNum').value;
    const rating = document.querySelector('#rating').value;
    const typeOfMedia = document.getElementById('typeOfMedia').value;
  
    // Validate
    if(mType === '' || title === '' || author === '' || pNum === '' || typeOfMedia === '' || rating === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(mType, title, author, pNum, typeOfMedia, rating);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });