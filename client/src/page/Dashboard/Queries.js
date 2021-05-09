import gql from "graphql-tag";

export const ALL_COMPANY = gql`
    query getCompanyById {
        getCompanyById {
            id
            companyName
            owner
            location
        }
    }
`