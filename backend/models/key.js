import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
});

const Key = mongoose.model("Key", apiKeySchema);

export default Key;