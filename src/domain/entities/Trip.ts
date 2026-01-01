import { TripParticipant } from "./TripParticipant";
import { Name } from "../valueObjects/Name";

export class Trip {
  private participants: TripParticipant[] = [];

  constructor(
    public readonly id: number,
    public readonly name: Name,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly createdAt: Date
  ) {}

}
