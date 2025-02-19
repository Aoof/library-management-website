// Must include the lms_app.js file before this file

const library = new Library();

function showMessage(message, type = 'info') {
    const msgDiv = document.getElementById('msg');
    msgDiv.innerText = message;
    msgDiv.classList.remove('d-none');
    msgDiv.classList.remove('alert-success', 'alert-danger', 'alert-info');

    switch (type) {
        case 'success':
            msgDiv.classList.add('alert-success');
            break;
        case 'danger':
            msgDiv.classList.add('alert-danger');
            break;
        default:
            msgDiv.classList.add('alert-info');
    }

    setTimeout(() => msgDiv.classList.add('d-none'), 3000);
}

function refreshBooksList() {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';
    const books = library.getAvailableBooks();
    
    if (books.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item text-muted';
        li.textContent = 'No books available';
        booksList.appendChild(li);
        return;
    }

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>${book.title}</strong> 
                <small class="text-muted">by ${book.author}</small>
            </span>
            <div>
                <span class="badge bg-secondary me-2">${book.year}</span>
                <button class="btn btn-danger btn-sm remove-book" data-title="${book.title}">
                    Remove
                </button>
            </div>
        `;
        booksList.appendChild(li);
    });

    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            if (confirm(`Are you sure you want to remove "${title}"?`)) {
                library.removeBook(title);
                showMessage(`Removed "${title}"`, 'success');
                refreshBooksList();
            }
        });
    });
}

document.getElementById('addBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const year = parseInt(document.getElementById('bookYear').value, 10);
    if (title && author && year) {
        const book = new Book();
        book.title = title;
        book.author = author;
        book.year = year;
        library.addBook(book);
        showMessage(`Added "${title}"`, 'success');
        refreshBooksList();
        e.target.reset();
    } else {
        showMessage('Please fill all fields.', 'danger');
    }
});

document.getElementById('borrowBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('borrowTitle').value.trim();
    const book = library.borrowBook(title);
    if (book) {
        showMessage(`You borrowed "${book.title}"`, 'success');
    } else {
        showMessage(`Book "${title}" is not available.`, 'danger');
    }
    refreshBooksList();
    e.target.reset();
});

document.getElementById('returnBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('returnTitle').value.trim();
    const book = library.returnBook(title);
    if (book) {
        showMessage(`Returned "${book.title}"`, 'success');
    } else {
        showMessage(`Book "${title}" was not borrowed.`, 'danger');
    }
    refreshBooksList();
    e.target.reset();
});

document.getElementById('listBooksBtn').addEventListener('click', () => {
    refreshBooksList();
    showMessage('Refreshed available books.', 'info');
});
