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
    searching: false,
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
      this.setState({ searching: true });
      BooksAPI.search(query, 20)
        .then(rawSearchResult => {
          if (rawSearchResult.error) {
            this.setState({ searchResult: [] });
          } else {
            // this matches rawSearchResult with the books on the shelf
            // if they are on the shelf it adds the shelf property
            const searchResult = rawSearchResult.map(book => {
              const shelfBook = this.state.myBooks.find(myBook => myBook.id === book.id);
              return shelfBook ? { ...book, shelf: shelfBook.shelf } : book;
            });
            this.setState({ searchResult });
          }
          this.setState({ searching: false });
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
          // note to self 'spread in object literal'
          newMyBooks.push({ ...changedBook, shelf });
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
    const { myBooks, searchResult, searching } = this.state;
    return (
      <div className="app">
        <Header />
        <Route path="/search" render={() => (
            <SearchBooks
              onSearchBooks={ this.onSearchBooks }
              onShelfChange={ this.onShelfChange }
              searchResult={ searchResult }
              searching={ searching }
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
