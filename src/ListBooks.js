import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  onShelfChange = (book, shelf) => {
    this.props.onShelfChange(book, shelf);
  }

  filterShelf(books, shelf) {
    const filteredBooks = books
      .filter(book => book.shelf === shelf)
      .map(book => (<Book onShelfChange={ this.onShelfChange } key={ book.id } book={ book } />));
    return filteredBooks;
  }

  render() {
    const { books } = this.props;
    const currentlyReading = this.filterShelf(books, 'currentlyReading');
    const wantToRead = this.filterShelf(books, 'wantToRead');
    const read = this.filterShelf(books, 'read');

    return (
    <div className="list-books">
      <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { currentlyReading }
              </ol>
            </div>
          </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              { wantToRead }
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              { read }
            </ol>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>);
  }
}

export default ListBooks;
