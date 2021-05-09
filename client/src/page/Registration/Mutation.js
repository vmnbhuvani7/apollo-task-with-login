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

export const REGISTRATION_USER = gql`
    mutation REGISTER_NEW_USER ($firstName: String!, $lastName: String!,  $userName: String!, $password: String!, $email: String!){
        registerUser(
            newUser: {
            firstName: $firstName
            lastName: $lastName
            userName: $userName
            password: $password
            email: $email
            }
        ) {
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

export const DELETE_EMPLOYEE = gql`
    mutation deleteEmployee($id: ID!) {
        deleteEmployee(id:$id){
            id 
            success 
            message
        }
    }
`

export const CREATE_EMPLOYEE = gql`
    mutation createNewEmployee($name:String!, $age:Number!,$post:String!,$salary:Number!,$department:String!,$company:ID!,) {
        createNewEmployee(
            newPost: {
            name:$name
            age:$age            
            post:$post
            salary:$salary            
            department:$department
            company:$company
            }
        ) {
            id
            name
            age
            post
            salary
            department
            company
        }
    }
`