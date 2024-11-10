import topicRepository from "@repositories/topic-repository";
import { TTopic } from "@schemas/topic-schema";

// ------------------------ POST --------------------------
const createTopic = async (data: TTopic) => {
  return await topicRepository.createTopic(data);
};

// ------------------------ GET --------------------------
const getTopics = async () => {
  return topicRepository.getTopics();
};

const getTopic = async (slug: string) => {
  return await topicRepository.getTopic(slug);
};

// ------------------------ PUT --------------------------
const updateTopic = async (id: number, data: TTopic) => {
  return await topicRepository.updateTopic(id, data);
};

// ------------------------ DELETE --------------------------
const deleteTopic = async (id: number) => {
  return await topicRepository.deleteTopic(id);
};

const topicService = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
};

export default topicService;
