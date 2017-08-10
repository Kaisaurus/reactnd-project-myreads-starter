import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Header = () => (

  <div className="list-books-title">
    <nav className="header-nav">
      <Link to="/">
        <FontAwesome name="book" />
      </Link>
      <Link to="/search">
        <FontAwesome name="search" />
      </Link>
    </nav>
    <h1>MyReads</h1>
  </div>

);

export default Header;
