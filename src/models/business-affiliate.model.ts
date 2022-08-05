import { Schema, model, Types, Date } from "mongoose"

interface BusinessAffiliateInterface {
  _id: Types.ObjectId
  business: Types.ObjectId
  affiliate: Types.ObjectId
  affiliateCanActivateCard: boolean
  affiliateCanCheckoutCard: boolean
  dateAdded: Date
}

const schema = new Schema<BusinessAffiliateInterface>({
  business: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  affiliate: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  affiliateCanActivateCard: { type: Boolean },
  affiliateCanCheckoutCard: { type: Boolean },
  dateAdded: { type: Date, default: Date.now() }
})

export default model("BusinessAffiliate", schema);