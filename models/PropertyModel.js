const mongoose=require('mongoose');

const propertySchema = mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        default: 'India',
      },
    },
    contactDetails: {
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'Villa', 'Duplex', 'Studio', 'Other'],
      required: true,
    },
    propertySize: {
      type: Number,
      required: true, // Size in square feet
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    toilets: {
      type: Number,
      required: true,
    },
    houseType: {
      type: String,
      enum: ['Apartment', 'Building'], // Restricts values to "Apartment" or "Building"
      required: true,
    },
    buildingOrApartmentName: {
      type: String,
      trim: true, // E.g., "Skyline Towers" or "Blue Ridge Apartments"
    },
    images: [
      {
        type: String, // Store image URL or path
        required: false,
      }
    ],
    rentPrice: {
      type: Number,
      required: true, // Price for renting the property
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
