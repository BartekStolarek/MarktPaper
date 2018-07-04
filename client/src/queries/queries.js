import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
            email
            phone
            city
        }
    }
`;

const getAdvertsQuery = gql`
    {
        advertisement {
            id
            title
            description
            price
        }
    }
`;

export { getAdvertsQuery, getAuthorsQuery };