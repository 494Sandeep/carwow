var graphql = require('graphql');
var User = require('../models/user')
var Car = require('../models/car')
var Brand = require('../models/brand')
var {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const CarType = new GraphQLObjectType({
    name: 'CarType',
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: new GraphQLList(GraphQLString) },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        price: { type: GraphQLString },
        keySpecs: {
            type: keySpecType,
        }
    })
})
const keySpecType = new GraphQLObjectType({
    name: 'KeySpecType',
    fields: () => ({
        mileage: { type: GraphQLString },
        engine: { type: GraphQLString },
        bhp: { type: GraphQLString },
        transmission: { type: GraphQLString },
        seats: { type: GraphQLString },
        airbags: { type: GraphQLString },
        fueltype: { type: GraphQLString }
    })
})
const userType = new GraphQLObjectType({
    name: 'userType',
    fields: () => ({
        id: { type: GraphQLID },
        profilePic: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})
const BrandType = new GraphQLObjectType({
    name: 'BrandType',
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: GraphQLString },
        brand: { type: GraphQLString },
        carList: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({ brand: parent.brand })
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: CarType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Car.findById(args.id)
            }
        },
        carList: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({})
            }
        },
        user: {
            type: userType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({})
            }
        },
        brand: {
            type: new GraphQLList(CarType),
            args: {
                brand: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Car.find({ brand: args.brand })
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                profilePic: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    profilePic: args.profilePic,
                    email: args.email,
                    username: args.username,
                    password: args.password
                })
                return user.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})