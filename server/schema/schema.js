const graphql = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Advertisement = require('../models/advertisement');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLNonNull } = graphql;

const AdvertisementType = new GraphQLObjectType({
    name: 'Advertisement',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        price: { type: GraphQLString },
        negotiable: { type: GraphQLBoolean },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        city: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        gender: { type: GraphQLString },
        advertisement: {
            type: new GraphQLList(AdvertisementType),
            resolve(parent, args) {
                return Advertisement.find({ authorId: parent.id });
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
                name: { type: GraphQLString },
                country: { type: GraphQLString },
                gender: { type: GraphQLString }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    country: args.country,
                    gender: args.gender
                });
                return author.save();
            }
        },
        addAdvertisement: {
            type: AdvertisementType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                price: { type: GraphQLString },
                city: { type: GraphQLString },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
                negotiable: { type: GraphQLBoolean },
                authorId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let advertisement = new Advertisement({
                    title: args.title,
                    description: args.description,
                    category: args.category,
                    price: args.price,
                    phone: args.phone,
                    email: args.email,
                    negotiable: args.negotiable,
                    authorId: args.authorId
                });
                return advertisement.save();
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
                return Advertisement.findById(args.id);
            }
        },
        advertisements: {
            type: new GraphQLList(AdvertisementType),
            resolve(parent, args) {
                return Advertisement.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db / other source
    
                //this is example of getting from dummy data
                return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})