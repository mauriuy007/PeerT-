import { IGetByIdRepo } from "./IGetByIdRepo";
import { IGetAllRepo } from "./IGetAllRepo";
import { IAddRepo } from "./IAddRepo";
import { User } from "../entities/User";

export interface IUserRepo
  extends IGetByIdRepo<User>,
          IGetAllRepo<User>,
          IAddRepo<User> {
}
