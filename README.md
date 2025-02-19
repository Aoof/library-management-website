# Library Management System

A simple library management system implementing core functionality for managing books in a library.

## Core Library Module

The system is built around two main classes:

### Book Class
```javascript
class Book {
    title = '';       // Book title
    author = '';      // Author name
    year = 0;        // Publication year
    isAvailable = true; // Availability status
}
```

### Library Class
Manages a collection of books with the following methods:

- `addBook(book)`: Adds a new book to the library
- `borrowBook(title)`: Marks a book as borrowed (unavailable)
- `returnBook(title)`: Marks a book as returned (available)
- `getAvailableBooks()`: Returns list of all available books
- `listAllBooks()`: Returns list of all book titles
- `removeBook(title)`: Removes a book from the library

#### Usage Example
```javascript
const library = new Library();

// Create and add a new book
const book = new Book();
book.title = "1984";
book.author = "George Orwell";
book.year = 1949;
library.addBook(book);

// Borrow a book
const borrowedBook = library.borrowBook("1984");

// Return a book
const returnedBook = library.returnBook("1984");

// Get available books
const availableBooks = library.getAvailableBooks();
```

## User Interface

The system includes a Bootstrap-based UI that provides:
- Forms for adding new books
- Borrow/return functionality
- Available books listing
- Book removal capability
- Status messages for user feedback

## Technical Details

- No external dependencies for core functionality
- Uses ES6 classes
- Bootstrap 5 for UI styling
- Modular design separating core logic from UI

## Implementation Notes

- Book availability is tracked using a boolean argument
- Book lookups are performed by title
- All operations provide immediate feedback
- Data is stored in memory (no persistence)

