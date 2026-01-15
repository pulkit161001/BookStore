import express from "express";
import { Book } from "../models/bookModel.js";
import { checkBookExist } from "../middleware/checkBook.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear)
			return res.statusCode(404).json({ msg: "Required values N/A" });

		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		};

		const book = await Book.create(newBook);

		return res.status(200).send(`Book added ${book}`);
	} catch (err) {
		console.log(err.message);
		res.status(500).send({ msg: `Error occured: ${err.message}` });
	}
});

router.get("/", async (req, res) => {
	try {
		const data = await Book.find({});
		res.status(200).json({
			count: data.length,
			data: data,
		});
	} catch (err) {
		res.send({ msg: `Error ${err}` });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		// const data = await Book.findOne({_id:id});
		const data = await Book.findById(id);
		res.status(200).json({
			data: data,
		});
	} catch (err) {
		res.send({ msg: `Error ${err}` });
	}
});

router.put("/:id", checkBookExist, async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Book.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true } //this will return the updated object
		);
		res.status(200).send(`Updated ${data}`);
	} catch (err) {
		res.send(`err ${err}`);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const result = await Book.findByIdAndDelete(req.params.id);
		if (!result) return res.status(404).send("Book N/A");
		return res.status(200).send({ msg: "book deleted" });
	} catch (err) {
		res.send(`err ${err}`);
	}
});

export default router;
