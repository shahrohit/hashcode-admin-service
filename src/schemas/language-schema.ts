import { z } from "zod";

const languageSchema = z.object({
  name: z.string().min(1, "Language Name is Required"),
  version: z.string().min(1, "Language Version is Required"),
  extension: z.string().min(1, "Language Extension is Required"),
  compileCmd: z.string().optional(),
  executeCmd: z.string().min(1, "Execute Command is Required"),
  options: z.string().optional(),
  isActive: z.boolean().optional(),
});

export default languageSchema;
export type TLanguage = z.infer<typeof languageSchema>;
