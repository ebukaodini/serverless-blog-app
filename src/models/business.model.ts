import { Schema, model, Types } from "mongoose"

interface BusinessInterface {
  _id: Types.ObjectId
  profile: {
    businessName: string
    industry: string
    category: string
    country: string
    staffSize: string
    businessLogo: string
    legal: {
      businessIsRegistered: boolean
      legalBusinessName: string
      registrationType: string
    }
  }
  contact: {
    generalEmail: string
    supportEmail: string
    disputeEmail: string
    telephone: string
    website: string
    twitter: string
    facebook: string
    instagram: string
  }
  payoutBankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  billing: {
    cardToken: string
  }
  dateCreated: Date
  businessIsClosed: boolean
}

const schema = new Schema<BusinessInterface>({
  profile: {
    businessName: {
      // the buisness name of the business or company
      type: String, required: true
    },
    industry: {
      // the industry the business belongs to
      type: String, required: true,
      enum: ['agriculture', 'commerce', 'education', 'financial-services', 'gaming', 'hospitality', 'health', 'leisure-and-entertainment', 'logistics', 'non-profit', 'travel', 'utilities']
    },
    category: {
      // the industry category the business belongs to
      type: String, required: true,
      enum: [] // TODO: to be provided later
    },
    country: { type: String, required: true },
    staffSize: {
      type: String, required: true,
      enum: ['1-5', '5-50', '50+']
    },
    businessLogo: {
      // this would hold the path to the s3 media object
      type: String,
      default: '' // TODO: should point to the Onyinye default logo
    },
    legal: {
      businessIsRegistered: { type: Boolean, default: false },
      legalBusinessName: { type: String },
      registrationType: {
        type: String,
        enum: ['incorporated-company', 'free-zone-entity', 'buisness-name-registration', 'incorporated-trustees', 'government-entity', 'private-entity-created-by-governemnt-approval', 'cooperative-society']
      }
    }
  },
  contact: {
    generalEmail: { type: String, required: true },
    supportEmail: { type: String, required: true },
    disputeEmail: { type: String, required: true },
    telephone: { type: String, required: true },
    website: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  // TODO: readup on Paystack payment storage methods
  payoutBankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String
  },
  billing: {
    cardToken: String
  },
  dateCreated: { type: Date, default: Date.now() },
  businessIsClosed: { type: Boolean, default: false }
})

export default model("Business", schema);