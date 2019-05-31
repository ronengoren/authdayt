// eslint-disable
// this is an auto generated file. This will be overwritten

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { graphqlMutation } from 'aws-appsync-react';

export const CreateTodo = gql`
  mutation CreateTodo($name: String!) {
    CreateTodo(input: {
      name: $name
    }) {
      name
    }
  }
`
// export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
//   updateTodo(input: $input) {
//     id
//     name
//     description
//   }
// }
// `;
// export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
//   deleteTodo(input: $input) {
//     id
//     name
//     description
//   }
// }
// `;
