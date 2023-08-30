import express from "express";
import multer from "multer";
import {
  getAllBorrowedBook,
  borrowingBook,
  borrowedProfile,
  createBook,
  changeStatus,
  createUser,
  getAllUser,
  getAvailableBook,
  deleteBookById,
  getAllLoan,
  getUserById,
  uploadImage,
  loaningBook,
  getAttributeData,
  getReturn
} from "../Controller/BookController.js";
// import { getUser } from "../Controller/Test.js";
const router = express.Router();

// const upload = multer({dest: 'public/images/'})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({storage}).single('image')


router.get("/book", getAllBorrowedBook);
router.post("/addBook", createBook);
router.get("/delete/:id", deleteBookById);
router.get("/available", getAvailableBook);

router.get("/borrower/:name", borrowedProfile);
router.post("/borrowing", borrowingBook);
router.post("/loaning", loaningBook)
router.get("/loan", getAllLoan);

router.post("/change-status", changeStatus);

router.post("/signup", createUser);
router.get("/user", getAllUser);
router.get("/userId", getUserById);

router.get("/return", getReturn)

router.post("/upload/image", upload, uploadImage);

router.get("/getAttributeData", getAttributeData)

export default router;
