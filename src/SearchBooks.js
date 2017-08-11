import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchBooks extends React.Component {
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    searchResult: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
  }

  state = {
    query: '',
  }

  onShelfChange = (book, shelf) => {
    this.props.onShelfChange(book, shelf);
  }

  updateQuery = query => {
    this.props.onSearchBooks(query);
    this.setState({ query });
  }

  showBooks = searchResult =>
    searchResult.map(book => (
      <Book
        onShelfChange={ this.onShelfChange }
        key={ book.id }
        book={ book }
      />)
    );


  render() {
    const { query } = this.state;
    const { searchResult, searching } = this.props;

    /*
    I am checking for array length instead of "error" object because I made App.js so it always passes an array.
    This is made this way because it was recommended to always pass the same data type. In this case an Array.
    I feel like passing the error object directly from the API would break this recommended practice... Let me know if I am wrong here...
    */
    const books = searchResult.length ? this.showBooks(searchResult) : null;
    const searchingText = (searching && !books) ? 'Searching...' : null;
    const notFoundText = (!!query && !books && !searching) ?
      'Couldn\'t find anything with those search terms.' : null;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={ (e) => this.updateQuery(e.target.value) }
            />
          </div>
        </div>
        <div className="search-books-results">
          <h2>
            { searchingText }
            { notFoundText }
          </h2>
          <ol className="books-grid">
            { books }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;