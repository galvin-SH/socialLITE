const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/ThoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
    .put(addReaction)
    .delete(deleteReaction)
    .delete(deleteThought);

module.exports = router;
