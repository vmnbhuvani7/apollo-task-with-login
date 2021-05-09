import gql from "graphql-tag";

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