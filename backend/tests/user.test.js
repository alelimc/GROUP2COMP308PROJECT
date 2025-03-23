const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const User = require('../models/User');
require('dotenv').config();

describe('User Registration', () => {
  let server;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ user: null })
    });
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clean up test data
    await mongoose.connection.close();
  });

  it('should register a new user successfully', async () => {
    const registerMutation = {
      query: `
        mutation {
          registerUser(
            email: "test@example.com"
            password: "password123"
            role: "nurse"
          ) {
            email
            role
          }
        }
      `
    };

    const response = await server.executeOperation(registerMutation);
    expect(response.errors).toBeUndefined();
    expect(response.data.registerUser).toEqual({
      email: "test@example.com",
      role: "nurse"
    });
  });
});