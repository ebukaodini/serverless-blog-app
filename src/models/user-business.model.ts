import { Schema, model, Types, Date } from "mongoose"

interface UserBusinessInterface {
  _id: Types.ObjectId
  user: Types.ObjectId
  business: Types.ObjectId
  role: 'owner' | 'admin' | 'support' | 'cashier' | 'developer'
  isActive: boolean
  permissions: string[]
}

const schema = new Schema<UserBusinessInterface>({
  user: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'User' },
  business: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  role: { type: String, required: true, index: true, enum: ['owner', 'admin', 'support', 'cashier', 'developer'] },
  isActive: { type: Boolean, default: false },
  permissions: { type: [String], required: true }
})

export default model("UserBusiness", schema);