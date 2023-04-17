const userRouter = require("./userRoute");
const chatRouter = require("./chatRouter");
const messageRoute = require("./messageRoute");
const initRoute = (app) => {
    app.use("/api/chats", chatRouter);
    app.use("/api/users", userRouter);
    app.use("/api/messages", messageRoute);
    return app.use("/", (req, res) => {
        console.log("Server on ...");
    });
};
module.exports = initRoute;
