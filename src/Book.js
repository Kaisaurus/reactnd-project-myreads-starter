import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { book, onShelfChange } = this.props;

    // work around to prevent undefined imageLinks to give errors
    const imageLinks = book.imageLinks || '';
    const thumbnail = imageLinks === '' ? '' : imageLinks.thumbnail;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${thumbnail})` }}
            ></div>
            <BookShelfChanger
              book={ book }
              onShelfChange={ onShelfChange }
            />
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>);
  }
}

export default Book;
