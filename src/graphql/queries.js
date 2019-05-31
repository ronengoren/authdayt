import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const listTodos = gql`
  query listPosts {
    listTodos {
      items {
        id title completed
      }
    }
  }
`