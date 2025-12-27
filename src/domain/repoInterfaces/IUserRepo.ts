import { IGetByIdRepo } from "./IGetByIdRepo";
import { IGetAllRepo } from "./IGetAllRepo";
import { IAddRepo } from "./IAddRepo";
import { User } from "../entities/User";

export interface UserRepoInterface
  extends IGetByIdRepo<User>,
          IGetAllRepo<User>,
          IAddRepo<User> {
}
