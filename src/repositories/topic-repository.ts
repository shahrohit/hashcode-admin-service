import prisma from "@config/db-config";
import { Conflict, NotFound } from "@utils/errors";
import { TTopic } from "@schemas/topic-schema";

// ------------------------ POST --------------------------
const createTopic = async (data: TTopic) => {
  const topic = await prisma.topic.findUnique({ where: { slug: data.slug } });
  if (topic) throw new Conflict("Topic Already Exist");
  await prisma.topic.create({ data });
};

// ------------------------ GET --------------------------
const getTopics = async () => {
  return await prisma.topic.findMany();
};

const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({ where: { slug: slug } });
  if (!topic) throw new NotFound("Topic Doesnot Exist");
  return topic;
};

// ------------------------ PUT --------------------------
const updateTopic = async (slug: string, data: TTopic) => {
  await prisma.topic.update({
    where: { slug: slug },
    data: data,
  });
};

// ------------------------ DELETE --------------------------
const deleteTopic = async (slug: string) => {
  await prisma.topic.delete({
    where: { slug: slug },
  });
};

const topicRepository = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
};

export default topicRepository;
