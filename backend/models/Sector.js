import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    cities: {
      type: [String],
      default: []
    },

    whatsapp: {
      type: String,
      required: true
    },

    snapchat: {
      type: String,
      required: true
    },

    phone: {
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
        }
    }
}
);

const Sector = mongoose.model("Sector", sectorSchema);

export default Sector;