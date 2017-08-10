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

    return (
    <div className="list-books">
      <div className="list-books-content">
        <BookShelf
          onShelfChange={ onShelfChange }
          books={ this.filterShelf(books, 'currentlyReading') }
          shelfTitle="Currently Reading"
        />
        <BookShelf
          onShelfChange={ onShelfChange }
          books={ this.filterShelf(books, 'wantToRead') }
          shelfTitle="Want To Read"
        />
        <BookShelf
          onShelfChange={ onShelfChange }
          books={ this.filterShelf(books, 'read') }
          shelfTitle="Read"
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>);
  }
}

export default ListBooks;
