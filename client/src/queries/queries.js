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
        advertisements {
            id
            title
            description
            price
            photo
            negotiable
        }
    }
`;

export { getAdvertsQuery, getAuthorsQuery };