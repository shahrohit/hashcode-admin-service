import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import authRepository from "@repositories/auth-repository";

// ------------------------ POST --------------------------
const register = async (data: TRegisterAdmin) => {
  return await authRepository.register(data);
};

const login = async (data: TLoginAdmin) => {
  return await authRepository.login(data);
};

const authService = {
  register,
  login,
};

export default authService;
