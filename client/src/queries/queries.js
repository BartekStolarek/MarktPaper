import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            id
            name
            gender
            country
        }
    }
`;

const getAdvertsQuery = gql`
    {
        advertisements {
            id
            title
            description
            category
            price
            city
            phone
            email
            negotiable
        }
    }
`;

const addAdvertMutation = gql`
    mutation AddAdvertisement($title: String!, $description: String!, 
        $price: String!, $category: String!, $city: String!, $negotiable: Boolean!, $authorId: String!) {
            addAdvertisement(title: $title, description: $description, 
                price: $price, category: $category, city: $city, negotiable: $negotiable, authorId: $authorId) {
                    title
                    description
                    category
                    price
                    negotiable
                    city
                    email
                    phone
                    author {
                        id
                        name
                        country
                        gender
                    }
                }
        }
`;

export { getAdvertsQuery, getAuthorsQuery, addAdvertMutation };