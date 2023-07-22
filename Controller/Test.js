import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const test = async (req, res) => {
  const data = await prisma.borrowedBook.findMany();
  console.log(data);
};

export const create = async (req, res) => {
    const time = new Date()
  const data = await prisma.user.create({
    data: {
      name: "wahyu",
      books:{
        create:{
            title: "KKC Web Dev Series",
            authors: "KKC ID"
        }
      },
      borrow:{
        create:{
            done_at: time
        }
      }
    },
  });
};

export const show = async (req,res) => {
  const data = await prisma.borrow.findMany({
    where:{
      id: 2
    },
    include:{
      user: true
    }
  });

  console.log(data);
//   console.log(data);
};

// create();

