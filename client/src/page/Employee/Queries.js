import gql from "graphql-tag";

export const SELECTED_COMPANY = gql`
    query getSelectedCompany($id:ID!) {
        getSelectedCompany(id: $id) {
            id
            companyName
            owner
            location
        }
    }
`

export const ALL_EMPLOYEE = gql`
    query getEmployee($id:ID!) {
        getEmployee(id: $id) {
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