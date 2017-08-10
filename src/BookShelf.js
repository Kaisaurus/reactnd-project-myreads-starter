import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { shelfTitle, books, onShelfChange } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map(book => (
              <Book
                onShelfChange={ onShelfChange }
                key={ book.id }
                book={ book }
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
