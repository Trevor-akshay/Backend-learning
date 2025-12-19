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
    const user = await getUser(id);
    return user;
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

  deleteUser = (id: number) => {
    deleteUser(id);
  };

  updateUser = (
    id: number,
    data: { name?: string; email?: string; password?: string }
  ) => {
    updateUser(id, data);
  };
}

export default UserService;
