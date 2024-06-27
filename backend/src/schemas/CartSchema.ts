import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      _id: false,
    },
  ],
});

export const Cart = mongoose.model("Cart", CartSchema);
