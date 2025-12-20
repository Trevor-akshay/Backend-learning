import { Request, Response, NextFunction, Router } from "express";
import { validationError } from "../utils/utils.ts";
import UserService from "../service/Users.service.ts";

class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    const { sort, filter } = req.query as {
      sort: string;
      filter: string;
    };

    const users = await this.userService.getUsers(sort, filter);

    res.status(200).json({
      users,
    });
  };

  getuser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return validationError(400, "User id must be a number", req, res);

    const user = await this.userService.getUser(id);

    res.status(200).json({
      data: user,
    });
  };

  addUser = async (req: Request, res: Response) => {
    const { name, email, password, orders } = req.body;

    if (!name) return validationError(400, "User name is required", req, res);
    if (!email) return validationError(400, "User email is required", req, res);
    if (!password)
      return validationError(400, "User password is required", req, res);

    const user = await this.userService.postUser({
      name,
      email,
      password,
      orders,
    });
    return res.status(201).json({
      message: "User added",
      data: user,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return validationError(400, "User id must be a number", req, res);

    await this.userService.deleteUser(id);

    res.status(204).json({
      message: "User Deleted",
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
      return validationError(400, "User id must be a number", req, res);

    await this.userService.updateUser(id, { ...req.body });

    res.status(202).json({
      message: "User Updated",
    });
  };
}

export default UserController;
