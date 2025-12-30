import { IGetByIdRepo } from "./IGetByIdRepo";
import { IGetAllRepo } from "./IGetAllRepo";
import { IAddRepo } from "./IAddRepo";
import type { Booking } from "../entities/Booking";

export interface IBookingRepo
  extends IGetByIdRepo<Booking>,
          IAddRepo<Booking>,
          IGetAllRepo<Booking> {
}
