import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash/flowRight';

import { getBooksQuery, deleteBookMutation } from '../queries/queries';
import BookDetail from './BookDetail';

class BookList extends Component {
  state = {
    selected: null
  };

  deleteBook = id => {
    this.props.deleteBookMutation({
      variables: {
        id
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  displayBook = () => {
    const data = this.props.getBooksQuery;
    if (data.error) {
      return <div>something went wrong</div>;
    }
    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul id='book-list'>
          {data.books.map(book => {
            return (
              <li key={book.id}>
                <div
                  onClick={e => {
                    this.setState({ selected: book.id });
                  }}
                >
                  {book.name}
                </div>
                <div
                  className='delete'
                  onClick={() => {
                    this.deleteBook(book.id);
                  }}
                >
                  x
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  };
  render() {
    return (
      <div>
        {this.displayBook()}
        <BookDetail bookId={this.state.selected} />
      </div>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(deleteBookMutation, { name: 'deleteBookMutation' })
)(BookList);
