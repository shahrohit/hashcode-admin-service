import prisma from "@config/db-config";
import { Conflict, NotFound } from "@utils/errors";
import { TTopic } from "@schemas/topic-schema";

const createTopic = async (data: TTopic) => {
  const topic = await prisma.topic.findUnique({ where: { slug: data.slug } });
  if (topic) throw new Conflict("Topic Already Exist");
  await prisma.topic.create({ data });
};

const getTopics = async () => {
  return await prisma.topic.findMany();
};

const getTopic = async (slug: string) => {
  const topic = await prisma.topic.findUnique({ where: { slug: slug } });
  if (!topic) throw new NotFound("Topic Doesnot Exist");
  return topic;
};

const updateTopic = async (id: number, data: TTopic) => {
  await prisma.topic.update({
    where: { id },
    data: data,
  });
};

const deleteTopic = async (id: number) => {
  await prisma.topic.delete({
    where: { id },
  });
};

// -------------------------------- User -----------------------
const getUserTopics = async () => {
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: {
          problems: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  });

  const a = topics.map(topic => ({
    name: topic.name,
    slug: topic.slug,
    count: topic._count.problems, // Get the count of problems
  }));
  return a;
};

const topicRepository = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
  getUserTopics,
};

export default topicRepository;
