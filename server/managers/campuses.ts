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

export const deleteSingleCampus = () => procBuilder.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await prisma.campus.delete({ where: { id: input.id } });
    return { id: input.id }
})

export const addSingleCampus = () => procBuilder.input(z.object({ name: z.string().min(2), imageUrl: z.string().min(1), address: z.string().min(1), description: z.string().min(1) })).mutation(async ({ input }) => {
    const { name, imageUrl, address, description } = input;
    const newCampus = await prisma.campus.create({
        data: {
            name,
            imageUrl,
            address,
            description
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            name: true,
            imageUrl: true,
            address: true,
            description: true
        }
    })
    return { newCampus };
})