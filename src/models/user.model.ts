import { Schema, model, Types, Date, Document, Model } from "mongoose"

export interface UserInterface extends Document {
  _id: Types.ObjectId
  firstname: string
  lastname: string
  email: string
  password: string
  dateCreated: Date
}

export interface UserModel extends Model<UserInterface> {
  _: any
}

const schema = new Schema<UserInterface>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, index: true, unique: true },
  password: { type: String, required: true, index: true },
  dateCreated: { type: Date, default: Date.now() }
})

export default model<UserInterface, UserModel>("User", schema);