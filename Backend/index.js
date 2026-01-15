import { NODE_ENV, PORT, mongoDBURL } from "./config.js";
import booksRouter from "./routes/booksRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch(() => {
		console.log("DB error occured");
	});

const app = express();
const __dirname = path.resolve();

app.use(express.json());
//Middleware for handling cors policy (used to give website access to the backend)
//option 1. allow all origin
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
//option 2. all custom origin
// app.use(cors({
//   origin:'http://localhost:3000',
//   methods:['GET','POST','PUT','DELETE'],
//   allowedHeaders:['Content-Type'],
// }))

app.use("/books", booksRouter);

if (NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}
app.listen(PORT, () => {
	console.log(`Express run ${PORT}`);
});
