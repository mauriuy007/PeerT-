import { IGetByIdRepo } from "./IGetByIdRepo";
import { IGetAllRepo } from "./IGetAllRepo";
import { IAddRepo } from "./IAddRepo";
import type { Destination } from "../entities/Destination";

export interface IDestinationRepo
  extends IGetByIdRepo<Destination>,
          IAddRepo<Destination>,
          IGetAllRepo<Destination> {
}
