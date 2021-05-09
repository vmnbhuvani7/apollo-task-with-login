import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation authenticateUser($userName:String!, $password:String!){
        authenticateUser(userName:$userName , password: $password) {
            token
            user {
                id
                firstName
                lastName
                userName
                email 
            }
        }
    }
`