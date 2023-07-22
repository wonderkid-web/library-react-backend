import express from "express";
import { getAllBorrowedBook, borrowingBook, borrowedProfile, changeStatus, createUser, getAllUser } from "../Controller/BookController.js";
// import { getUser } from "../Controller/Test.js";
const router = express.Router()

router.get('/book', getAllBorrowedBook)
router.get('/borrower/:name', borrowedProfile)
router.post('/borrowing', borrowingBook)
router.post('/change-status', changeStatus)
router.post('/signup', createUser)
router.get('/user', getAllUser)

export default router