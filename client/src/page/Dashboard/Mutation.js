import gql from "graphql-tag";

export const CREATE_COMPANY = gql`
mutation createNewCompany($companyName:String!, $location:String!) {
    createNewCompany(newPost: { 
        companyName: $companyName,
         location: $location
         }) {
            id
            companyName
            owner
            location
        }
    }
`
