const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const SpendingSchema = new mongoose.Schema({
  userID: String,
  category: {
    type: String,
    enum: ["food", "necessity", "justForFun"]
  },
  title: String,
  amount: Number
});

const DailyBudgetSchema = new mongoose.Schema({
  userID: String,
  food: Number,
  necessity: Number,
  justForFun: Number,
  saving: Number
});

const WishlistItemSchema = new mongoose.Schema({
  userID: String,
  title: String,
  imageURI: String,
  amount: Number
});

const User = mongoose.model("User", UserSchema);
const Spending = mongoose.model("Spending", SpendingSchema);
const DailyBudget = mongoose.model("DailyBudget", DailyBudgetSchema);
const WishlistItem = mongoose.model("WishlistItem", WishlistItemSchema);

module.exports = {
  User: User,
  Spending: Spending,
  DailyBudget: DailyBudget,
  WishlistItem: WishlistItem
};

//const template schema
//three categories in total:foods necessity justforfun
//{title:string amount:number category:enum}

//remember using a save button only save update data when it is clicked
//try to use modals if needed

//budget schema
//{category:enum amount:number}

//wishlist schema
//{wishitem:string value:number wantTIME:number weeks//want to get it in ...weeks}
