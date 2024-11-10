import { NotFound } from "@utils/errors";

const checkPrimaryKey = (id: any) => {
  const parsedId = +id;
  if (isNaN(parsedId) || parsedId <= 0) throw new NotFound("Not Found");

  return parsedId;
};
export default checkPrimaryKey;
