import { z } from "zod";
import { Difficulty, ID } from "@schemas/common-schema";

const problemSchema = z.object({
  title: z.string({ message: "Title is Required" }).min(1, "Title is Required"),
  slug: z
    .string({ message: "Slug is Required" })
    .min(1, { message: "Slug is Required" }),

  difficulty: Difficulty,
  topics: z.array(ID).nonempty("Topics Should contain atleast 1 topic"),

  description: z
    .string({ message: "Description is Required" })
    .min(10, "Description Should be atleast 10 characters"),

  sampleTestcases: z
    .array(z.string().min(1, "Testcase is Required"))
    .nonempty("Sample Testcases should contain atleast 1 testcase."),

  editorial: z.string().optional(),

  parameterName: z
    .string({ message: "Parameter Name is Required" })
    .min(1, "Parameter Name is Required"),

  memoryLimit: z.coerce
    .number({ message: "Required Number" })
    .positive("Required Positive Value"),

  timeLimit: z.coerce
    .number({ message: "Required Number" })
    .positive("Required Positive Value"),
});

export const problemLangCodeSchema = z.object({
  problemId: ID,
  langId: ID,
  starterCode: z.string().min(1, "Starter Code is Required"),
  driverCode: z.string().min(1, "Driver Code is Required"),
  solutionCode: z.string().min(1, "Solution Code is Required"),
});

export const problemTestcaseSchema = z.object({
  problemId: ID,
  input: z.string().min(1, "Input is Required"),
  output: z.string().min(1, "Output is Required"),
});

export default problemSchema;
export type TProblem = z.infer<typeof problemSchema>;
export type TProblemTestcase = z.infer<typeof problemTestcaseSchema>;
export type TProblemLangCode = z.infer<typeof problemLangCodeSchema>;
