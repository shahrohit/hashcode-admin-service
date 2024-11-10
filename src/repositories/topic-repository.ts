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
const updateTopic = async (id: number, data: TTopic) => {
  await prisma.topic.update({
    where: { id: id },
    data: data,
  });
};

// ------------------------ DELETE --------------------------
const deleteTopic = async (id: number) => {
  await prisma.topic.delete({
    where: { id: id },
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
