import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';
import Header from './Header';
import Sample from './Sample';
import ListBooks from './ListBooks';
import AlertContainer from 'react-alert';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    // loads all books
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  onShelfChange = (bookId, shelf) => {
    const changedBook = this.state.books.find((book) => book.id === bookId);
    BooksAPI
      .update(changedBook, shelf)
      .then(() => {
        const newBooks = this.state.books.map((book) => {
          const newBook = book;
          if (book.id === bookId) {
            newBook.shelf = shelf;
          }
          return newBook;
        });
        this.setState({ books: newBooks });
      })
      .then(() => this.showAlert(`${changedBook.title} moved to ${shelf}`))
      .catch((err) => {
        this.showAlert(`Wops.. moving shelves failed. Error: ${err.message}`);
      });
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'fade',
  }

  showAlert = (msg) => {
    this.msg.show(msg, {
      type: 'success',
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Header />
        <Route path="/search" component={ SearchBooks } />
        <Route path="/sample" component={ Sample } />
        <Route exact path="/" render={() => (
            <ListBooks books={ books } onShelfChange={ this.onShelfChange } />
          )}
        />
        <AlertContainer
          ref={a => { this.msg = a; } } {...this.alertOptions}
        />
      </div>
    );
  }
}

export default BooksApp;
