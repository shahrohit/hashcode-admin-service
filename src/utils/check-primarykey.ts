import { NotFound } from "@utils/errors";

const checkPrimarykey = (id: string | undefined) => {
  if (!id) throw new NotFound("Not Found");
  const parsedId = +id;
  if (isNaN(parsedId) || parsedId <= 0) throw new NotFound("Not Found");

  return parsedId;
};
export default checkPrimarykey;
