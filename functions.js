const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  const x = books.find((book) => book.id === bookId);
  return x;
}
// console.log(getBookById(31, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  const x = authors.find(
    (author) => author.name.toUpperCase() === authorName.toUpperCase()
  );
  return x;
}
// console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  const x = authors.map((author) => {
    return { author: author.name, bookCount: author.books.length };
  });
  return x;
}
// console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach((book) => {
    if (!colors.hasOwnProperty(book.color)) colors[book.color] = [book.title];
    else colors[book.color].push(book.title);
  });
  return colors;
}

//solution one return array of object but we need one object
// function booksByColor(books) {
//   const colors = [];
//   const final = {};
//   // const final = [];

//   books.forEach((book) => {
//     if (!colors.includes(book.color)) colors.push(book.color);
//   });

//   final = colors.map((color) => {
//     let bookTitle = [];

//     books.forEach((book) => {
//       if (color === book.color) {
//         bookTitle.push(book.title);
//       }
//     });
//     return { [color]: bookTitle };
//   });

//   return final;
// }
// console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  let x = [];
  books.forEach((book) => {
    // if (book.authors[0]["name"].toUpperCase() === authorName.toUpperCase())
    //   x.push(book.title); only work if ther is one author
    book.authors.forEach((author) => {
      if (author.name.toUpperCase() === authorName.toUpperCase())
        x.push(book.title);
    });
  });
  return x;
}
// console.log(titlesByAuthorName("LaUreN BEukeS", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let x = authors.sort((author1, author2) => {
    return author2.books.length - author1.books.length;
  });
  return x[0]["name"];
}
// console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  const relatedBook = books.find((book) => book.id === bookId);
  const relatedName = [];
  relatedBook.authors.forEach((author) => relatedName.push(author.name));

  let x = [];
  relatedName.forEach((author) => {
    let y = titlesByAuthorName(author, authors, books);
    y.forEach((y1) => x.push(y1));
  });

  return x;
  // let filteredBooks = [];
  // filteredBooks = x.filter((book, index) => x.indexOf(book) === index);
  // return filteredBooks;
}
// console.log(relatedBooks(46, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  let x = authors.map((author) => {
    let friendScoor = 0;
    author.books.forEach((id) => {
      let book = getBookById(id, books);

      if (book.authors.length > 1) friendScoor++;
    });

    return { name: author.name, scoor: friendScoor };
  });
  x.sort((author1, author2) => {
    return author2.scoor - author1.scoor;
  });

  return x[0]["name"];
}
// console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */
