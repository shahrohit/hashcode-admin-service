import { z } from "zod";

const topicSchema = z.object({
  name: z.string().min(1, "Topic Name is Required"),
  slug: z.string().min(1, "Topic Slug is Required"),
});

export default topicSchema;
export type TTopic = z.infer<typeof topicSchema>;
