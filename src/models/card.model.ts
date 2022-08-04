import { Schema, model, Types, Date } from "mongoose"

interface CardInterface {
  _id: Types.ObjectId
  business: Types.ObjectId
  design: Types.ObjectId
  cardType: 'open' | 'closed'
  currency: string
  amount: number
  cardIsPhysical: boolean
  listCardInStore: boolean
  status: 'pending' | 'delivered' | 'active' | 'used' | 'destroyed'
  dateCreated: Date
  operation: {
    isManufactured: boolean
    isDelivered: boolean
  }
  activation: {
    isActivated: boolean
    dateActivated: Date
    activatedBy: Types.ObjectId
  }
}

const schema = new Schema<CardInterface>({
  business: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  design: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'CardDesign' },
  status: { type: String, required: true, index: true, default: 'pending', enum: ['pending', 'delivered', 'active', 'used', 'destroyed'] },
  cardType: { type: String, required: true, index: true, default: 'closed', enum: ['open', 'closed'] },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  cardIsPhysical: { type: Boolean, default: false },
  listCardInStore: { type: Boolean, default: true },
  dateCreated: { type: Date, default: Date.now() },
  operation: {
    isManufactured: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
  },
  activation: {
    isActivated: { type: Boolean, default: false },
    dateActivated: { type: Date },
    activatedBy: { type: Types.ObjectId, index: true, ref: 'UserBusiness' }
  }
})

export default model("Card", schema);