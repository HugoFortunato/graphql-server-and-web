import { gql } from '@apollo/client';

export const GET_USERS = gql`query{
  getUsers {
    id
    name
    job_title
    email
  }
}`;

export const UPDATE_EMAIL = gql`
  mutation ($id: Int, $email: String!) {
    updateUserInfo(id: $id, email: $email)
  }
`

export const ADD_USER = gql`
  mutation ($name: String!, $email: String!, $jobtitle: String!) {
   createUser(name: $name, email: $email, job_title: $jobtitle)
  }
`