const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//get ALL USER
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); //lors de la recuperation des users ne pas renvoyer le password
  res.status(200).json(users);
};

//user Info
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID not found : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID not found : " + err);
  }).select("-password");
};

//update User
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID not found : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//delete User
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID not found : " + req.params.id);
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID not found : " + req.params.id);
  try {
    //ajouter a la liste de follower
    await UserModel.findByIdAndUpdate(
      res.params.id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true, upsert: true },
      (err, docs) => {
        
        if(err) return res.status(400).json(err);
      }
    );
    //ajouter a la liste de following

    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID not found : " + req.params.id);
  try {
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
