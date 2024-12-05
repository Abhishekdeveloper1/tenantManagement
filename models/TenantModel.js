const mongoose=require('mongoose');
// const TenantSchema = new mongoose.Schema(
//   {
//     // Personal Information
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     dateOfBirth: {
//       type: Date,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: ['Male', 'Female', 'Other'],
//       required: true,
//     },

//     // Contact Information
//     contactDetails: {
//       phone: {
//         type: String,
//         required: true,
//         match: [/^\d{10}$/, 'Phone number must be 10 digits'],
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
//       },
//     },

//     // Address Information
//     currentAddress: {
//       street: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       zipCode: { type: String, required: true },
//       country: { type: String, default: 'India' },
//     },
//     permanentAddress: {
//       street: { type: String },
//       city: { type: String },
//       state: { type: String },
//       zipCode: { type: String },
//       country: { type: String, default: 'India' },
//     },

//     // Tenancy Details
//     propertyId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Property', // Assuming there's a Property model
//       required: true,
//     },
//     leaseStartDate: {
//       type: Date,
//       required: true,
//     },
//     leaseEndDate: {
//       type: Date,
//       required: true,
//     },
//     monthlyRent: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['Paid', 'Pending', 'Overdue'],
//       default: 'Pending',
//     },

//     // Additional Fields
//     emergencyContact: {
//       name: { type: String, required: true },
//       relationship: { type: String, required: true },
//       phone: {
//         type: String,
//         required: true,
//         match: [/^\d{10}$/, 'Phone number must be 10 digits'],
//       },
//     },
//     // documents: [
//     //   {
//     //     documentType: { type: String, required: true },
//     //     documentPath: { type: String, required: true },
//     //     uploadedAt: { type: Date, default: Date.now },
//     //   },
//     // ],

//     // Timestamps
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
//   }
// );

// module.exports = mongoose.model('Tenant', TenantSchema);
const TenantSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },

    // Contact Information
    contactDetails: {
      phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      },
    },

    // Address Information
    currentAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },

    // Tenancy Preferences
    preferredLeaseStartDate: {
      type: Date,
      required: true,
    },
    leaseDuration: {
      type: Number,
      required: true,
      min: 1, // Minimum lease duration in months
    },
    budget: {
      type: Number,
      required: true,
    },

    // Emergency Contact
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
      },
    },

    // Uploaded Documents
    // idProof: {
    //   type: String, // File path or URL for uploaded ID proof
    //   required: false,
    // },
    // addressProof: {
    //   type: String, // File path or URL for uploaded Address proof
    //   required: false,
    // },

    idProof: [{ type: String }], // Updated to accept an array of strings
    addressProof: [{ type: String }],
    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('Tenant', TenantSchema);
