class Book {
    title = '';
    author = '';
    year = 0;
    isAvailable = true;
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    borrowBook(title) {
        const book = this.books.find(book => book.title === title);
        if (book?.isAvailable) {
            book.isAvailable = false;
            return book;
        }
        return null;
    }

    returnBook(title) {
        const book = this.books.find(book => book.title === title);
        if (book && !book.isAvailable) {
            book.isAvailable = true;
            return book;
        }
        return null;
    }

    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }

    listAllBooks() {
        return this.books.map(book => book.title);
    }

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
}
