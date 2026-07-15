import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (document, object) => {
        delete object._id;
        delete object.password;
      }
    }
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;