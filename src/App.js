import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';
import Header from './Header';
import ListBooks from './ListBooks';
import AlertContainer from 'react-alert';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    searchResult: [],
    noSearchResultMsg: true,
  }

  componentDidMount() {
    // loads all books
    BooksAPI.getAll()
      .then(myBooks => this.setState({ myBooks }))
      .catch((err) => {
        this.showAlert(`Wops.. books didn't load. Error: ${err.message}`);
      });
  }

  onSearchBooks = (query) => {
    // empty search results if query is empty
    if (!query) {
      this.setState({ searchResult: [] });
    } else {
      // Search for books
      BooksAPI.search(query, 20)
        .then(searchResult => {
          if (searchResult.length >= 1) {
            this.setState({ searchResult });
            this.setState({ noSearchResultMsg: true });
          } else {
            this.setState({ searchResult: [] });
            this.setState({ noSearchResultMsg: false });
          }
        })
        .catch((err) => {
          this.showAlert(`Wops.. something went wrong with the search. Error: ${err.message}`);
        });
    }
  }

  onShelfChange = (changedBook, shelf) => {
    BooksAPI
      .update(changedBook, shelf)
      .then(() => {
        // filter myBooks to exclude the modified book
        const newMyBooks = this.state.myBooks.filter(book =>
          book.id !== changedBook.id
        );
        // add the changed book to newMyBooks if a shelf is set
        if (shelf !== 'none') {
          const updatedBook = changedBook;
          updatedBook.shelf = shelf;
          newMyBooks.push(updatedBook);
        }
        this.setState({ myBooks: newMyBooks });
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
    const { myBooks, searchResult, noSearchResultMsg } = this.state;
    return (
      <div className="app">
        <Header />
        <Route path="/search" render={() => (
            <SearchBooks
              onSearchBooks={ this.onSearchBooks }
              onShelfChange={ this.onShelfChange }
              searchResult={ searchResult }
              noSearchResultMsg={ noSearchResultMsg }
            />
          )}
        />
        <Route exact path="/" render={() => (
            <ListBooks
              books={ myBooks }
              onShelfChange={ this.onShelfChange }
            />
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
