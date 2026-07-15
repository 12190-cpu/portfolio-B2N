import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: ["Burgers", "Wraps", "Plats", "Desserts", "Boissons"]
    },

    price: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    ingredients: {
      type: [String],
      default: []
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

const Product = mongoose.model("Product", productSchema);

export default Product;