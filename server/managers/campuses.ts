import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { prisma } from "./prisma";
import { procBuilder } from "./rpc";

export const getAllCampuses = () =>
    procBuilder.query(async () => {
        const campuses = await prisma.campus.findMany();


        return {
            campuses: campuses,
        }
    })
