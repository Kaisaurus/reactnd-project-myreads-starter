import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  filterShelf(books, shelf) {
    return books
      .filter(book => book.shelf === shelf);
  }

  render() {
    const { books, onShelfChange } = this.props;
    const shelves = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Read',
      read: 'Read',
    };

    return (
    <div className="list-books">
      <div className="list-books-content">
        { Object.keys(shelves).map(key =>
          <BookShelf
            onShelfChange={ onShelfChange }
            books={ this.filterShelf(books, key) }
            shelfTitle={ shelves[key] }
            key={ key }
          />
        )}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>);
  }
}

export default ListBooks;
