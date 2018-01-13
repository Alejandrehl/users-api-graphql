const graphql = require('graphql');
const axios = require('axios');
const {

	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema

} = graphql;

const users = [
	{ id: '23', firstName: 'Alejandro', age: 23 },
	{ id: '24', firstName: 'Silvana', age: 20 },
	{ id: '25', firstName: 'Loreto', age: 46 },
	{ id: '26', firstName: 'Pedro', age: 29 },
	{ id: '27', firstName: 'Juan Paulo', age: 27 },
];

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/users/${args.id}`)
				.then(resp => resp.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});