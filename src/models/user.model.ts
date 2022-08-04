import { Schema, model, Types, Date } from "mongoose"

interface UserInterface {
  _id: Types.ObjectId
  firstname: string
  lastname: string
  telephone: string
  email: string
  password: string
  enabled2FA: boolean
  emailVerified: boolean
  telephoneVerified: boolean
  dateCreated: Date
  isBlocked: boolean
}

const schema = new Schema<UserInterface>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  telephone: { type: String, index: true, unique: true },
  email: { type: String, index: true, unique: true },
  password: { type: String, required: true, index: true },
  enabled2FA: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  telephoneVerified: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
  isBlocked: { type: Boolean, default: false }
})

export default model("User", schema);