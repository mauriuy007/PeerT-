import { IGetByIdRepo } from "./IGetByIdRepo";
import { IGetAllRepo } from "./IGetAllRepo";
import { IAddRepo } from "./IAddRepo";
import type { Trip } from "../entities/Trip";

export interface ITripRepo
  extends IGetByIdRepo<Trip>,
          IAddRepo<Trip>,
          IGetAllRepo<Trip> {
}
