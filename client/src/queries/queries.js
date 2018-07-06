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

const getCitiesQuery = gql`
    {
        cities {
            id
            name
            voivodenship
        }
    }
`;

const addAdvertMutation = gql`
    mutation AddAdvertisement($title: String!, $description: String!, 
        $price: String!, $photo: String!, $negotiable: Boolean!) {
            addAdvertisement(title: $title, description: $description, 
                price: $price, photo: $photo, negotiable: $negotiable) {
                    title
                    description
                    price
                    photo
                    negotiable
                }
        }
`;

export { getAdvertsQuery, getAuthorsQuery, addAdvertMutation };