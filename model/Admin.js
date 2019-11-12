const timestamps = require("mongoose-timestamp");
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  
  email: {
    type: String,
  },

  password: {
    type: String,
  },

  isVerified: {
    type: Boolean,
  },

  username:{
    type: String,
  },

  secretToken: {
   type: String,
  },

  fullname:{
    type: String,
  },

  phone:{
    type: String,
  },

  country:{
    type: String,
  },

  address:{
    type: String,
  },

  city: {
    type: String,
  },
  company: {
    type: String,
  },

  connection: {
        domain: String,
        username: String,
        password: String,
    },


});
AdminSchema.plugin(timestamps);
module.exports = Admin = mongoose.model("Admin", AdminSchema);
