const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const { users, projects } = require("./sampleData");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return _.filter(projects, { clientId: parent.id });
      },
    },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLString },
    clientId: { type: GraphQLString },
    projectName: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.clientId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return users;
      },
    },
    project: {
      type: ProjectType,
      args: { clientId: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(projects, { clientId: args.clientId });
      },
    },
    projects: {
        type: new GraphQLList(ProjectType),
        resolve() {
            return projects;
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
