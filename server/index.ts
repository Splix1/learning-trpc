// @filename: index.ts
import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from './managers/prisma';
import { appRouter, createContext } from './managers/rpc';
const express = require('express');



export type AppRouter = typeof appRouter;



const app = express();
const PORT = 5000;

async function main() {

    app.use('/rpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }))
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect;
        process.exit(1);
    });


