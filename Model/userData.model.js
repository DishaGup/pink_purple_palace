const { Schema, model } = require("mongoose");

const userDataSchema = Schema(
  {
    userName: { type: String, required: true },
    userId: { type: String, require: true },
    id: { type: String, require: true },
    symbol: { type: String, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
    current_price: { type: Number, require: true },
    market_cap: { type: Number, require: true },
    market_cap_rank: { type: Number, require: true },
    price_change_24h: { type: Number, require: true },
    price_change_percentage_24h: { type: Number, require: true },
    market_cap_change_24h: { type: Number, require: true },
    total_supply: { type: Number, require: true },
    last_updated: { type: Date, default: Date.now() },
    bookmarked:{type:Boolean,default:false}
  },
  {
    versionKey: false,
  }
);

const UserDataModel = model("users_data_bookmarked", userDataSchema);

module.exports = { UserDataModel };
