const express = require("express");
//const app = express();
const router = express.Router();
const User = require("./models").User;
const DailyBudget = require("./models").DailyBudget;
const Spending = require("./models").Spending;

const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

//require models from models.js files

router.post("/register", (req, res) => {
  //create new user and save
  console.log(req.body);
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user
    .save()
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  //console.log("user out here");
  User.findById(id, function (err, user) {
    //console.log("yea", user);
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function (email, password, done) {
      //console.log("yolo");
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!user) {
          console.log("no user");
          return done(null, false, { message: "Incorrect email." });
        }
        if (password !== user.password) {
          console.log("bad password");
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

router.get("/user", function (req, res) {
  //console.log("here", req);
  //  if (req.user) {
  //console.log(req.user);
  res.json(req.user);
  // }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.send("logout");
});

router.post("/createBudgets", function (req, res) {
  //console.log("here", req.user);

  let newBudget = new DailyBudget({
    userID: req.user._id,
    food: req.body.food,
    necessity: req.body.necessity,
    justForFun: req.body.justForFun,
    saving: (req.body.food + req.body.necessity + req.body.justForFun) * 7
  });
  newBudget.save().then(response => {
    console.log(response);
    res.send(response);
  })
    .catch(err => {
      console.log(err);
      res.send(err);
    });

})

router.post("/manageBudgets", function (req, res) {
  DailyBudget.findOneAndUpdate({ userID: req.user._id },
    {
      food: req.body.food,
      necessity: req.body.necessity,
      justForFun: req.body.justForFun,

    },
    { useFindAndModify: false }).exec(function (err) {
      if (!err) {
        res.send("success")
      } else {
        console.log(err);
        res.send("failuer")
      }
    })
})

router.get("/manageBudgets", function (req, res) {
  DailyBudget.find({ userID: req.user._id }).exec(function (err, data) {
    if (!err) {
      console.log("get", data)
      res.send({
        //saving: data[0].saving,

        userId: req.user._id,
        array: data
      });
    } else {
      console.log(err);
    }
  })

})

router.get("/spending", function (req, res) {
  Spending.find({ userID: req.user._id }).exec(function (err, data) {
    if (!err) {
      //console.log("get", data)
      res.send({

        spending: data

      });
    } else {
      console.log(err);
    }
  })

})

router.post("/spending", function (req, res) {
  let newSpending = new Spending({
    userID: req.user._id,
    category: req.body.category,
    title: req.body.title,
    amount: req.body.amount
  });
  newSpending.save().
    then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
})

router.post("/updateSaving", function (req, res) {
  DailyBudget.findOneAndUpdate({ userID: req.user._id },
    {
      saving: req.body.saving
    },
    { useFindAndModify: false }).exec(function (err) {
      if (!err) {
        res.send("success")
      } else {
        console.log(err);
        res.send("failuer")
      }
    })

})

module.exports = router;
