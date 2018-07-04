const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLNonNull } = graphql;

//dummy data
var adverts = [
    { title: 'Gaming Mouse', description: 'New gaming mouse!', price: "20 USD", authorID: '1', id: '1'},
    { title: 'Gaming Mouse', description: 'New gaming mouse!', price: "20 USD", authorID: '2', id: '2'},
    { title: 'Gaming Mouse', description: 'New gaming mouse!', price: "20 USD", authorID: '3', id: '3'},
    { title: 'Keyboard', description: 'New gaming keyboard!', price: "50 USD", authorID: '1', id: '4'},
];

var authors = [
    { name: 'Joe', email: 'joe@example.com', phone: '123456789', city: 'New York', id: '1'},
    { name: 'Joe', email: 'joe@example.com', phone: '123456789', city: 'New York', id: '2'},
    { name: 'Joe', email: 'joe@example.com', phone: '123456789', city: 'New York', id: '3'}
];

const AdvertisementType = new GraphQLObjectType({
    name: 'Advertisement',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        negotiable: { type: GraphQLBoolean },
        photo: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorID })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        city: { type: GraphQLString },
        advertisements: {
            type: new GraphQLList(AdvertisementType),
            resolve(parent, args) {
                return _.filter(adverts, { authorID: parent.id })
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                city: { type: GraphQLString }
            },
            resolve(parent, args) {
                let author = new AuthorType({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    city: args.city
                });
                return authors.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        advertisement: {
            type: AdvertisementType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db / other source

                //this is example of getting from dummy data
                return _.find(adverts, { id: args.id });
            }
        },
        advertisements: {
            type: new GraphQLList(AdvertisementType),
            resolve(parent, args) {
                return adverts;
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db / other source
    
                //this is example of getting from dummy data
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})