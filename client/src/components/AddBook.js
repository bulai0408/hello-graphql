import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash/flowRight';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.error) {
      return <option disabled>something went wrong</option>;
    }
    if (data.loading) {
      return <option disabled>Loading...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = e => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  return (
    <form action='' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          value={genre}
          onChange={e => {
            setGenre(e.target.value);
          }}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select
          name=''
          id=''
          value={authorId}
          onChange={e => {
            setAuthorId(e.target.value);
          }}
        >
          <option value=''>select author</option>
          {displayAuthors()}
        </select>
      </div>
      <div>
        <button>+</button>
      </div>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
