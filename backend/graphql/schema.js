const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    firstName: String
    lastName: String
  }

  type VitalSigns {
    id: ID!
    patientId: ID!
    nurseId: ID!
    temperature: Float
    heartRate: Int
    bloodPressure: BloodPressure
    respiratoryRate: Int
    recordedAt: String
  }

  type BloodPressure {
    systolic: Int
    diastolic: Int
  }

  type Query {
    getUser(id: ID!): User
    getPatientVitalSigns(patientId: ID!): [VitalSigns]
  }

  type Mutation {
    registerUser(email: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): String # Returns JWT token
    recordVitalSigns(input: VitalSignsInput!): VitalSigns
  }

  input VitalSignsInput {
    patientId: ID!
    temperature: Float
    heartRate: Int
    bloodPressureSystolic: Int
    bloodPressureDiastolic: Int
    respiratoryRate: Int
  }
`;

module.exports = typeDefs;