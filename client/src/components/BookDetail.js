import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

function BookDetail(props) {
  const displayBookDetail = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {book.author.books.map(i => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };
  return <div id='book-details'>{displayBookDetail()}</div>;
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetail);
