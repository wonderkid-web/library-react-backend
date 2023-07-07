import express from "express";
import { getAllBorrowedBook, borrowingBook, borrowedProfile, changeStatus } from "../Controller/BookController.js";

const router = express.Router()

router.get('/book', getAllBorrowedBook)
router.get('/user/:name', borrowedProfile)
router.post('/borrowing', borrowingBook)
router.post('/change-status', changeStatus)

export default router