const graphql = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Advertisement = require('../models/advertisement');
const City = require('../models/city');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLNonNull } = graphql;

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
        city: {
            type: CityType,
            resolve(parent, args) {
                return CityType.findById(parent.cityId)
            }
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return AuthorType.findById(parent.authorId);
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
                return Advertisement.find({ authorId: parent.id })
            }
        }
    })
});

const CityType = new GraphQLObjectType({
    name: 'City',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        voivodenship: { type: GraphQLString },
        advertisements: {
            type: new GraphQLList(AdvertisementType),
            resolve(parent, args) {
                return Advertisement.find({ cityId: parent.id })
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
                let author = new Author({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    city: args.city
                });
                return author.save();
            }
        },
        addAdvertisement: {
            type: AdvertisementType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                photo: { type: GraphQLString },
                negotiable: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let advertisement = new Advertisement({
                    title: args.title,
                    description: args.description,
                    price: args.price,
                    photo: args.photo,
                    negotiable: args.negotiable
                });
                return advertisement.save();
            }
        },
        addCity: {
            type: CityType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                voivodenship: { type: GraphQLString }
            },
            resolve(parent, args) {
                let city = new City({
                    name: args.name,
                    voivodenship: args.voivodenship
                });
                return city.save();
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
        cities: {
            type: new GraphQLList(CityType),
            resolve(parent, args) {
                return City.find({});
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})