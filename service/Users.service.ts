import {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../data/db.ts";
class UserService {
  getUsers = async (sort: string | undefined, filter: string | undefined) => {
    return await getUsers();
  };

  getUser = async (id: number) => {
    return await getUser(id);
  };

  postUser = async (data: {
    name: string;
    email: string;
    password: string;
    orders?: Array<{ item: string; Quantiy: number }>;
  }) => {
    const user = await createUsers(data);
    return user;
  };

  deleteUser = async (id: number) => {
    return await deleteUser(id);
  };

  updateUser = async (
    id: number,
    data: { name?: string; email?: string; password?: string }
  ) => {
    return await updateUser(id, data);
  };
}

export default UserService;
