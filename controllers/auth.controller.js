const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) =>{
    const {pseudo, email, password} = req.body;
    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(200).json({user: user_id});
    } catch (error) {
        res.status(200).json({error});
    }
}