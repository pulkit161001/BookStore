import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";

async function checkBookExist(req, res, next) {
  const { id } = req.params;

  //check whether courseId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid id format");
  }

  const data = await Book.findOne({ _id: id });

  if (data == null) return res.status(400).send("No such book exist");

  req.book = data;
  next();
}

export { checkBookExist };
