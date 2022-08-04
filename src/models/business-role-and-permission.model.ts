import { Schema, model, Types, Date } from "mongoose"

type Role = 'owner' | 'admin' | 'support' | 'cashier' | 'developer'
// TODO: define full list of acceptable permissions
type Permission =
  'dashboard:create-user' | 'dashboard:delete-user'
type Roles = {
  role: Role,
  permissions: Record<Permission, boolean>
}

interface BusinessRoleAndPermissionInterface {
  _id: Types.ObjectId
  business: Types.ObjectId
  roles: Roles[]
  lastModified: Date
}

const schema = new Schema<BusinessRoleAndPermissionInterface>({
  business: { type: Schema.Types.ObjectId, index: true, required: true, ref: 'Business' },
  roles: { type: Schema.Types.Mixed, required: true, index: true },
  lastModified: { type: Date, default: Date.now() }
})

export default model("BusinessRoleAndPermission", schema);