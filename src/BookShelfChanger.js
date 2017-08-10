import React from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends React.Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
  }

  clickShelfChange = e => {
    const clickedShelf = e.target.value;
    if (this.props.book.shelf !== clickedShelf) {
      this.props.onShelfChange(clickedShelf);
    }
  }

  render() {
    let { shelf } = this.props.book;
    if (!shelf) {
      shelf = 'none';
    }

    return (
      <div className="book-shelf-changer">
        <select onChange={ this.clickShelfChange } defaultValue={ shelf }>
          <option value="none" disabled>Move to... </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>);
  }
}

export default BookShelfChanger;
