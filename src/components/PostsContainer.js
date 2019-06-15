import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import styles from "../assets/styles/Account";

import gql from 'graphql-tag';
import { Query } from 'react-apollo';





const postsQuery = gql`
  query postsQuery {
  user {
      id
      username
      posts(orderBy: createdAt_DESC) {
        id
        createdAt
        text
      }
    }
  }
`;

export default PostsContainer = ({ data, createPost }) => (
  <Query query={postsQuery}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
       <View><Text>PostsContainer</Text></View>
      );
    }}
  </Query>
);