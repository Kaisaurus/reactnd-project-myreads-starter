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
    const books = searchResult.length > 1 ? this.showBooks(searchResult) : null;
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