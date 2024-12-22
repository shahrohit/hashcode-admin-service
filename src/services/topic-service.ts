import topicRepository from "@repositories/topic-repository";
import { TTopic } from "@schemas/topic-schema";

const createTopic = async (data: TTopic) => {
  return await topicRepository.createTopic(data);
};

const getTopics = async () => {
  return topicRepository.getTopics();
};

const getTopic = async (slug: string) => {
  return await topicRepository.getTopic(slug);
};

const updateTopic = async (id: number, data: TTopic) => {
  return await topicRepository.updateTopic(id, data);
};

const deleteTopic = async (id: number) => {
  return await topicRepository.deleteTopic(id);
};

const getUserTopics = async () => {
  return topicRepository.getUserTopics();
};
const topicService = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
  getUserTopics,
};

export default topicService;
