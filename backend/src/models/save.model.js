const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user from saving same food multiple times
saveSchema.index(
  {
    user: 1,
    food: 1,
  },
  {
    unique: true,
  }
);

const saveModel = mongoose.model("save", saveSchema);

module.exports = saveModel;