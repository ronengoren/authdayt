import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import awsmobile from '../aws-exports';
import Amplify, { API } from "aws-amplify";
import AWSAppSyncClient from "aws-appsync";

Amplify.configure(awsmobile);

Amplify.configure({
    API: {
      graphql_headers: async () => ({
          'My-Custom-Header': 'my value'
      })
    }
  });