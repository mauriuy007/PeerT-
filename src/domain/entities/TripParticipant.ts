class TripParticipant {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly role: TripParticipantRole,
    public readonly joinedAt: Date
  ) {}
}
