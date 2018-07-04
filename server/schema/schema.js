const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//dummy data
var adverts = [
    { title: 'Gaming Mouse', description: 'I will sell almost brand new gaming mouse!', id: '1'},
    { title: 'Gaming Mouse', description: 'I will sell almost brand new gaming mouse!', id: '2'},
    { title: 'Gaming Mouse', description: 'I will sell almost brand new gaming mouse!', id: '3'}
];

const AdvertisementType = new GraphQLObjectType({
name: 'Advertisement',
fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
    })
});

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
        }}
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})