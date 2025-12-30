export class Booking {
  constructor(
    public readonly id: number,
    public readonly tripId: number,
    public readonly bookingType: BookingType,
    public readonly provider: Provider,
    public readonly reference: Reference,
    public readonly money: Money,
    public readonly status: Status,
    public readonly createdAt: Date
  ) {}
}
