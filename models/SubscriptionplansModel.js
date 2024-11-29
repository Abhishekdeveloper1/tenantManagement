// const { Schema, default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const subscriptionplansSchema=mongoose.Schema({
    planName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      duration: {
        type: String, // e.g., 'monthly', 'yearly'
        required: true,
      },
      features: {
        type: [String], // Array of features included in the plan
        default: [],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

});
module.exports=mongoose.model('subscriptionplan',subscriptionplansSchema);