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
            photo
            negotiable
        }
    }
`;

const addAdvertMutation = gql`
    mutation AddAdvertisement($title: String!, $description: String!, 
        $price: String!, $category: String!, $city: String!, $negotiable: Boolean!) {
            addAdvertisement(title: $title, description: $description, 
                price: $price, category: $category, city: $city, negotiable: $negotiable) {
                    title
                    description
                    category
                    price
                    negotiable
                    city
                    authorId
                }
        }
`;

export { getAdvertsQuery, getAuthorsQuery, addAdvertMutation };