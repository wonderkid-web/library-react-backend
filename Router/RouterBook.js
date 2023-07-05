import express from "express";
import { getAllBorrowedBook, borrowingBook, borrowedProfile } from "../Controller/BookController.js";

const router = express.Router()

router.get('/book', getAllBorrowedBook)
router.get('/user/:name', borrowedProfile)
router.post('/borrowing', borrowingBook)

export default router