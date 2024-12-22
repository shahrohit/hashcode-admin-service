import prisma from "@config/db-config";
import { Conflict, Unauthorized } from "@utils/errors";
import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import { generateHashPassword, verifyPassword } from "@utils/fn";
import { ADMIN } from "@/utils/strings";

const register = async (data: TRegisterAdmin) => {
  const admin = await prisma.admin.findUnique({ where: { email: data.email } });
  if (admin) throw new Conflict("Admin Already Exist");

  const hashedPassword = await generateHashPassword(data.password);
  await prisma.admin.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
};

const login = async (data: TLoginAdmin) => {
  const admin = await prisma.admin.findUnique({ where: { email: data.email } });
  if (!admin) throw new Unauthorized("Invalid Credentail");

  const isValidPw = await verifyPassword(data.password, admin.password);
  if (!isValidPw) throw new Unauthorized("Invalid Credentail");

  return {
    name: admin.name,
    email: admin.email,
    username: "ADMIN",
    role: ADMIN,
  };
};

const authRepository = {
  register,
  login,
};

export default authRepository;
