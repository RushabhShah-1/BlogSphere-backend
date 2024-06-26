import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

const token = mongoose.model("token", tokenSchema);

export default token;
