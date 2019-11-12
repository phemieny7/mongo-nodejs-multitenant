const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateRandomString = require("../middleware/randomString");
const config = require("config");
const authenticate = require("../middleware/authenticate");
const MongoClient = require('mongodb').MongoClient;

// @validator to validate all input
const validateRegisterInput = require("../validation/register");


// @Database Call on all database needed for connections
const Admin = require("../model/Admin");

// @route   GET api/admin/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   Post api/user/register
// @desc    Register New User
// @access  Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const {
      name,
      email,
      password,
      company,
      password2,
      username,
      country,
      address } = req.body;

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      res.status(400).json({
        errors: { msg: "User Already Exist" }
      });
    }
    const secretToken = generateRandomString(30);

    const newAdmin = new Admin({
      name,
      email,
      password,
      secretToken,
      company,
      username,
      country,
      address,
      connection: {
        domain: company,
        db: username,
        password: password
      },
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        newAdmin.password = hash;
        newAdmin
          .save()
          .then(admin => {
            let url = "mongodb://localhost:27017/";

            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
             const dbo = db.db(`${newAdmin.company}`);
              const details = {
                name: `${newAdmin.name}`,
                address: `${newAdmin.address}`,
                password: `${newAdmin.name = hash}`,
                role: 1,
                email: `${newAdmin.email}`,
                isVerified: true,
              };
              dbo.collection("users").insertOne(details, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
              });
            });
            res.status(200).json("successfully create user and user database");
          })
          .catch(err => console.log(err));
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


module.exports = router;
