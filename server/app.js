import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import postRoute from "./src/routes/post.route.js";
import testRoute from "./src/routes/test.route.js";
import userRoute from "./src/routes/user.route.js";
import messageRoute from "./src/routes/message.route.js";

const app = express();
dotenv.config({ path: "./.env" });

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/messages", messageRoute);

export default app;