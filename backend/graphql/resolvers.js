const User = require('../models/User');
const VitalSigns = require('../models/VitalSigns');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    getUser: async (_, { id }, context) => {
      // Check authentication
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(id);
    },
    getPatientVitalSigns: async (_, { patientId }, context) => {
      // Check authentication
      if (!context.user) throw new Error('Not authenticated');
      return await VitalSigns.find({ patientId }).sort({ recordedAt: -1 });
    }
  },

  Mutation: {
    registerUser: async (_, { email, password, role }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        role
      });
      return await user.save();
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      // Generate JWT token
      return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
    },

    recordVitalSigns: async (_, { input }, context) => {
      // Check authentication and nurse role
      if (!context.user) throw new Error('Not authenticated');
      if (context.user.role !== 'nurse') throw new Error('Not authorized');

      const vitalSigns = new VitalSigns({
        patientId: input.patientId,
        nurseId: context.user.userId,
        temperature: input.temperature,
        heartRate: input.heartRate,
        bloodPressure: {
          systolic: input.bloodPressureSystolic,
          diastolic: input.bloodPressureDiastolic
        },
        respiratoryRate: input.respiratoryRate
      });
      return await vitalSigns.save();
    }
  }
};

module.exports = resolvers;