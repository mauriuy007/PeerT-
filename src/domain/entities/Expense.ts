export class Expense {
  constructor(
    public readonly id: number,
    public readonly tripId: number,
    public readonly money: Money,
    public readonly category: Category,
    public readonly date: Date,
    public readonly itineraryItemId: number | null,
    public readonly name: Name,
    public readonly description: Description,
    public readonly createdAt: Date
  ) {}
}
