const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  temperature: Number,
  heartRate: Number,
  bloodPressure: {
    systolic: Number,
    diastolic: Number
  },
  respiratoryRate: Number,
  recordedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VitalSigns', vitalSignsSchema);