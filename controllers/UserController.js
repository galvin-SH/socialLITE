const { User, Thought } = require("../models");

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
                .populate({ path: "thoughts" })
                .sort({ _id: -1 });
            res.json(users);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    // get one user by id
    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id }).populate({
                path: "thoughts",
            });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    // create user
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    // update user by id
    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id }, body, {
                new: true,
                runValidators: true,
            });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }
            await Thought.deleteMany({ _id: user.thoughts });
            res.json({ message: "User and associated thoughts deleted!" });
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    async addFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
    async deleteFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with this id!" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.sendStatus(400);
        }
    },
};
