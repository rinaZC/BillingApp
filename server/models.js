const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//const template schema
//three categories in total:foods necessity justforfun
//{title:string amount:number category:enum}

//remember using a save button only save update data when it is clicked
//try to use modals if needed

//budget schema
//{category:enum amount:number}

//wishlist schema
//{wishitem:string value:number wantTIME:number weeks//want to get it in ...weeks}
