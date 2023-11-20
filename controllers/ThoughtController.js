const { Thought, User } = require("../models");

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
                .populate({ path: "reactions" })
                .sort({ _id: -1 });
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // get one thought by id
    async getThoughtById({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.id }).populate({
                path: "reactions",
            });
            if (!thought) {
                res.status(404).json({
                    message: "No thought found with this id!",
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // create thought
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            await User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // update thought by id
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                {
                    new: true,
                    runValidators: true,
                }
            );
            if (!thought) {
                res.status(404).json({
                    message: "No thought found with this id!",
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // delete thought
    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.id });
            if (!thought) {
                res.status(404).json({
                    message: "No thought found with this id!",
                });
                return;
            }
            await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: params.id } }
            );
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // add reaction
    async addReaction({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({
                    message: "No thought found with this id!",
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // delete reaction
    async deleteReaction({ params }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({
                    message: "No thought found with this id!",
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};
