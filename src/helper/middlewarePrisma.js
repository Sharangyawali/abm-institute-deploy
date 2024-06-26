// helper/db.js

import { PrismaClient } from "@prisma/client";

let prismaMiddleware;

if (process.env.NODE_ENV === 'production') {
  // Use a simplified version or mock for production or edge environments
  prismaMiddleware = {
    user: {
      async findUnique({ where }) {
        // Mock implementation or simplified logic
        return { id: 1, username: 'example' }; // Example mock data
      },
    },
  };
} else {
  // Use full Prisma Client in development
  prismaMiddleware = new PrismaClient();
}

export default prismaMiddleware;
