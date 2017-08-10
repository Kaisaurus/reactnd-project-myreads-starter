import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchBooks extends React.Component {
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    searchResult: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    noSearchResultMsg: PropTypes.bool.isRequired,
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

  showBooks = searchResult => {
    const books = searchResult.map(book => (
      <Book
        onShelfChange={ this.onShelfChange }
        key={ book.id }
        book={ book }
      />)
    );
    return books;
  }

  render() {
    const { query } = this.state;
    const { searchResult } = this.props;
    const noSearchResultMsg = this.props.noSearchResultMsg || (
      <h2>Couldn't find anything with those terms</h2>
    );

    let books = null;
    if (searchResult) {
      books = this.showBooks(searchResult);
    }

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
          { noSearchResultMsg }
          <ol className="books-grid">
            { books }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;