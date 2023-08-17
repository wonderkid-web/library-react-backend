import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const getUser = async (req, res) => {
  // const data = await prisma.borrow.findMany({
  //   include:{
  //     books:{
  //       include:{
  //         user: true
  //       }
  //     }
  //   }
  // });

  // const data = await prisma.user.create({
  //   data:{
  //     name: 'SUPER ocha'
  //   }
  // });

  // const data = await prisma.borrow.findMany({
  //  where:{
  //   books:{
  //     every:{
  //       user:{
  //         name: "Wonderkid"
  //       }
  //     }
  //   }
  //  },
  //  include:{
  //   books:{
  //     select:{
  //       user:{
  //         select:{
  //           name: true
  //         }
  //       }
  //     }
  //   }
  //  }
  // });

  // const data = await prisma.user.update({
  //   where:{
  //     id: 1
  //   },
  //   data:{
  //     books:{
  //       create:{
  //         title: "FRONDEV DEV KKC SERIES",
  //         authors: "KKC - ID",
  //         borrow:{
  //           create:{
  //             done_at: new Date()
  //           }
  //         }
  //       }
  //     }
  //   }
  // })

//   return res.status(200).json({ msg: data });
// };

export const getAllBorrowedBook = async (req, res) => {
  try {
    const data = await prisma.book.findMany();
    const dataAPI = await fetch('https://www.dbooks.org/api/recent')
    const {books} = await dataAPI.json()
    if (res.status(200)) {
      res.json({
        status: "Sukses",
        total: data.length + books.length,
        details: [...data, ...books]
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ msg: e.message });
  }
};

export const getAvailableBook = async (req, res) =>{
  try{
    const data = await prisma.book.findMany()
    if(data){
      res.status(200).json({
        length: data.length,
        data
      })
    }


  }catch(e){
    res.status(400).json({"error": e.message})
  }
} 

export const borrowingBook = async (req, res) => {
  const { idBook, borrower, imgURL, status, return_at } = req.body;
  try {
    // Periksa apakah entri dengan kondisi yang sama sudah ada
    const existingEntry = await prisma.BorrowedBook.findFirst({
      where: {
        idBook: idBook,
        borrower: borrower,
        status: status,
      },
    });

    if (existingEntry) {
      return res
        .status(409)
        .json({ msg: "Entri dengan kondisi yang sama sudah ada." });
    }

    // Jika entri belum ada, buat entri baru
    await prisma.BorrowedBook.create({
      data: {
        idBook,
        borrower,
        imgURL,
        status,
        return_at: return_at.toString(),
      },
    });
    return res.status(200).json({ msg: "Sukses" });
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan dalam membuat entri baru." });
  }
};

export const borrowedProfile = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await prisma.borrowedBook.findMany({
      where: {
        borrower: name,
      },
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ msg: e.message });
    console.log(e.message);
  }
};

export const changeStatus = async (req, res) => {
  const { idBook } = req.body;
  try {
    const data = await prisma.borrowedBook.update({
      where: {
        idBook,
      },
      data: {
        status: false,
      },
    });
  } catch (e) {
    console.log(e.message);
  }
};


export const createUser = async (req, res) =>{
  const {name, email} = req.body;
  try{
    const newUser = await prisma.user.create({
      data:{
        name, 
        email
      }
    })
    // console.log(name, email);
  }catch(e){
    console.log(e.message);
  }
}

export const getAllUser = async (req, res) =>{
  try{
    const allUser = await prisma.user.findMany({
      include:{
        books: true
      }
    })

    return res.status(200).json(allUser)
  }catch(e){
    console.error(e.message);
  }
}

export const createBook = async (req, res) =>{
  try{
    const {data} = req.body
    console.log(data)
    const sampleBook = await prisma.book.create({
      data: {
        title: data.title,
        authors: data.author,
        bookId: data.bookId,
        image: data.image,
        stock: Number(data.stock),
        category: data.category
      }
    })

    if (res.status(200)) {
      res.status(200).json({
        status: "Sukses",
      })
    }
  }catch(e){
    res.status(404).json({msg: e.message})
    console.log(e.message);
  }
}