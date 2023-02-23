import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const getUser = await prisma.post.findMany({
    
  })