const express = require("express");
const {
    createMessage,
    getMessages,
} = require("../controllers/messageController");

const router = express.Router();

// router.post("/register", registerUser);

router.post("/", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;
