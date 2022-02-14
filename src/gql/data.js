import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';
import { SingletonStore } from '../singleton/store';



export const subscriptionData = gql`
  subscription  {
    reloadData {
        type
        ids
        roles
        message
    }
  }
`