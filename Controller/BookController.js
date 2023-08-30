import fs from "fs";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buku dari API
export const getApiBook = async (req, res) => {
  try {
    const data = await fetch("https://www.dbooks.org/api/recent");
    if (res.status(200)) {
      res.json({
        status: "Sukses",
        total: data.length,
        data,
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ msg: e.message });
  }
};

// Buku yang Terpinjam
export const getAllBorrowedBook = async (req, res) => {
  try {
    const data = await prisma.book.findMany();
    if (res.status(200)) {
      res.json({
        status: "Sukses",
        total: data.length,
        details: [...data],
      });
    }
    // const data = await prisma.book.findMany();
    // const dataAPI = await fetch("https://www.dbooks.org/api/recent");
    // const { books } = await dataAPI.json();
    // if (res.status(200)) {
    //   res.json({
    //     status: "Sukses",
    //     total: data.length + books.length,
    //     details: [...data, ...books],
    //   });
    // }
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ msg: e.message });
  }
};

// Buku yang bisa di Delete dari Admin
export const getAvailableBook = async (req, res) => {
  try {
    const data = await prisma.book.findMany();
    if (data) {
      res.status(200).json({
        length: data.length,
        data,
      });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

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
    const data = await prisma.borrow.findMany({
      where: {
        name: name,
      },
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ msg: e.message });
    console.log(e.message);
  }
};

export const getAllLoan = async (req, res) => {
  try {
    const data = await prisma.borrow.findMany({
      include: {
        books: true,
      },
    });

    if (data) {
      res.status(200).json(data);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// export const loaningBook = async (req, res) => {
//   try {
//     const data = await prisma.book.findMany();

//     if (data) {
//       res.status(200).json(data);
//     }
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

export const changeStatus = async (req, res) => {
  const { idLoan, idBook } = req.body;

  try {
    const data = await prisma.borrow.update({
      where: {
        id: Number(idLoan),
      },
      data: {
        status: false,
        books: {
          update: {
            where: {
              id: Number(idBook),
            },
            data: {
              stock: {
                increment: 1,
              },
            },
          },
        },
      },
    });

    await prisma.return.create({
      data:{
        return_at: new Date(),
        loan:{
          connect:{
            id: Number(idLoan)
          }
        }
      }
    })


  } catch (e) {
    console.log(e.message);
  }
};

// Ngebuat USER
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    if (newUser) {
      res.status(200).json({ msg: "User Baru berhasil di Tambah!" });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

//ngambil SEMUA USER
export const getAllUser = async (req, res) => {
  try {
    const allUser = await prisma.user.findMany({
      include: {
        loans: true,
      },
    });

    return res.status(200).json(allUser);
  } catch (e) {
    console.error(e.message);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await prisma.user.findMany({
      where: {
        id,
      },
    });

    if (user) {
      return res.status(200).json(user);
    }
  } catch (e) {
    console.error(e.message);
  }
};

//BUAT BUKU
export const createBook = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    const sampleBook = await prisma.book.create({
      data: {
        title: data.title,
        authors: data.author,
        bookId: data.bookId,
        image: data.image,
        stock: Number(data.stock),
        category: data.category,
      },
    });

    if (res.status(200)) {
      res.status(200).json({
        status: "Sukses",
      });
    }
  } catch (e) {
    res.status(404).json({ msg: e.message });
    console.log(e.message);
  }
};

//NGAPUS BUKU MELALUI ADMIN
export const deleteBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBookData = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    if (deleteBookData) {
      res.status(200).json({ msg: "Berhasil di Delete" });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    // Assuming 'path' is the path to your image file

    const imagePath = `${req.file.path}`;

    // Read the image file as a Buffer
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading image file:", err);
        return;
      }

      const imageBuffer = Buffer.from(data);
      console.log(imageBuffer);

      // Now you can use the 'imageBuffer' to store in your MySQL database
      // Make sure to follow your MySQL library's documentation for storing binary data in the database.
    });

    console.log(req.file);
  } catch (error) {}
};

export const loaningBook = async (req, res) => {
  const { id, email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    await prisma.book.update({
      where: {
        id,
      },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        loans: {
          create: {
            name: user.name,
            done_at: moment().add(3, "days").format(),
            books: {
              connect: {
                id,
              },
            },
          },
        },
      },
    });

    res.status(200);
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};

export const getReturn = async (req, res) => {
  try {
    const data = await prisma.return.findMany({
     include:{
      loan:true
     }
    });

    if (data) {
      res.status(200).json({
        return: data,
      });
    }
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};


export const getAttributeData = async (req, res) =>{
  try{
    const countUser = await prisma.user.findMany()
    const countLoan = await prisma.borrow.findMany()
    const countReturn = await prisma.return.findMany()
    const countBook = await prisma.book.findMany()
    const lastLoaning = await prisma.borrow.findFirst({
      orderBy:{
        id: 'desc'
      }
    })
    const lastReturning = await prisma.return.findFirst({
      orderBy:{
        id: 'desc'
      },
      include:{
        loan: true
      }
    })

    res.status(200).json({
      user: countUser.length,
      loan: countLoan.length,
      book: countBook.length,
      return: countReturn.length,
      last_loaning: lastLoaning,
      last_returning: lastReturning,
    })
  }catch(e){
    res.status(404).json({msg: e.message})
  }
}