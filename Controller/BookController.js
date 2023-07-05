import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBorrowedBook = async (req, res) => {
  try {
    const data = await prisma.BorrowedBook.findMany();
    if (res.status(200)) {
      res.json({
        status: "Sukses",
        details: data,
      });
    }
  }  catch(e) {
    console.log(e.message)
    res.status(404).json({msg: e.message})
  }
};

export const borrowingBook = async (req, res) => {
  const {idBook, borrower} = req.body
  try {
    const data = await prisma.BorrowedBook.create({
      data: {
        idBook,
        borrower
      },
    });
    res.json({msg:"sukses"})
  } catch(e) {
    console.log(e.message)
    res.status(404).json({msg: e.message})
  }
};


export const borrowedProfile = async (req, res) =>{
  const {name} = req.params
  try{
    const data = await prisma.borrowedBook.findMany({
      where:{
        borrower: name
      }
    })
    res.status(200).json(data)
  }catch(e){
    res.status(400).json({msg: e.message})
    console.log(e.message);
  }
}