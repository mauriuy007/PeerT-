class TripParticipantRole {
  private constructor(
    private readonly value: "OWNER" | "MEMBER"
  ) {}

  static OWNER = new TripParticipantRole("OWNER");
  static MEMBER = new TripParticipantRole("MEMBER");

  canInvite(): boolean {
    return this.value === "OWNER";
  }

  canEditTrip(): boolean {
    return this.value === "OWNER";
  }
}
