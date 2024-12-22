import { z } from "zod";

export const ID = z.coerce.number().positive("Invalid ID");

export const Difficulty = z.enum(["Basic", "Easy", "Medium", "Hard"], {
  message: "Difficulty should be either Basic or Easy or Medium or Hard",
});

export type TDifficulty = z.infer<typeof Difficulty>;
