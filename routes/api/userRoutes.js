const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .put(addFriend)
    .delete(deleteFriend)
    .delete(deleteUser);

module.exports = router;
