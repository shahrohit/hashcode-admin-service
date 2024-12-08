import { z } from "zod";

const languageSchema = z.object({
  name: z.string().min(1, "Language Name is Required"),
  lang: z.string().min(1, "Language Version is Required"),
});

export default languageSchema;
export type TLanguage = z.infer<typeof languageSchema>;
