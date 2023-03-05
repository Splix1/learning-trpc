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
    });

export const getSingleCampus = () => procBuilder.input(z.object({ id: z.string().min(1) })).query(async (req) => {
    try {
        const campus = await prisma.campus.findUnique({
            where: {
                id: +req.input.id
            }
        })
        return {
            campus
        }
    } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid ID" });
    }
})
