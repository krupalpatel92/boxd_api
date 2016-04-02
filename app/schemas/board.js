let Schema = require('mongoose').Schema
let userAdminSchema = require('./userAdmin')
let listSchema = require('./list')

let obj = {
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  background: {
    type: String,
    maxlength: 500
  },

  project_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  users: {
    type: [userAdminSchema],
    validate: {
      validator(arr) { return !!_.find(arr, { admin: true }) },
      message: 'You can\'t remove all admins from a board.'
    }
  },
  lists: {
    type: [listSchema],
    default: []
  }
}


let boardSchema = new Schema(obj)
let archievedBoardSchema = new Schema(obj)

boardSchema.index({ 'project_id': 1 })
archievedBoardSchema.index({ 'project_id': 1 })

module.exports = { boardSchema, archievedBoardSchema }
