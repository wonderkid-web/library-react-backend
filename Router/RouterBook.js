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
  getReturn,
  addImage,
  getImageByBookId,
  cleanAll,
  changeNote
} from "../Controller/BookController.js";
import moment from "moment";
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const date = new Date()
    cb(null, `${file.originalname}`);
  },
});


const upload = multer({storage}).single('image')


router.get("/book", getAllBorrowedBook);
router.post("/addBook", createBook);
router.get("/delete/:id", deleteBookById);
router.get("/available", getAvailableBook);

router.post('/image', getImageByBookId)
router.post("/addImage", upload,addImage)

router.get("/borrower/:name", borrowedProfile);
router.post("/borrowing", borrowingBook);
router.post("/loaning", loaningBook)
router.get("/loan", getAllLoan);

router.post("/change-status", changeStatus);
router.post("/change-note", changeNote);

router.post("/signup", createUser);
router.get("/user", getAllUser);
router.get("/userId", getUserById);

router.get("/return", getReturn)

router.get("/getAttributeData", getAttributeData)

router.get('/clean', cleanAll)

export default router;
