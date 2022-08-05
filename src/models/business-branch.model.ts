import { Schema, model, Types } from "mongoose"

interface BusinessBranchInterface {
  _id: Types.ObjectId
  business: Types.ObjectId
  branchName: string
  country: string
  state: string
  city: string
  address: string
  apartmentNumber: string
  proofOfAddress: string
}

const schema = new Schema<BusinessBranchInterface>({
  // TODO: readup on how to integrate cascading with mongdb
  business: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  branchName: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  apartmentNumber: { type: String, required: true },
  proofOfAddress: {
    // this would hold the path to the s3 media object
    // this could be an electricity bill, waste bill, etc
    type: String, required: true
  },
})

export default model("BusinessBranch", schema);