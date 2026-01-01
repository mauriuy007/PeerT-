export class ItineraryItem {
  constructor(
    public readonly id: number,
    public readonly tripId: number,
    public readonly date: Date,
    public readonly destinationId: number,
    public readonly name: Name,
    public readonly description: Description
  ) {}
}
