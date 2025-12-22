class Trip {
  private participants: TripParticipant[] = [];

  constructor(
    public readonly id: number,
    public readonly name: Name,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly createdAt: Date
  ) {}

}
