const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User.model");

exports.userFindController = async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAdminController = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const userData = await UserModel.findOne(query);
    const isAdmin = userData.role === "admin";
    res.send({ admin: isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.makeAdminUserController = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("email", email);
    const filter = { email: email };
    const updateEmail = {
      $set: {
        role: "admin",
      },
    };
    const result = await UserModel.updateOne(filter, updateEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.storLoginDataController = async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateEmail = {
      $set: user,
    };
    const result = await UserModel.updateOne(filter, updateEmail, options);

    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserController = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await UserModel.deleteOne({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
