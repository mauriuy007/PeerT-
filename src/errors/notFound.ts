export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class TripNotFoundError extends Error {
  constructor() {
    super('Trip not found');
  }
}

export class BookingNotFoundError extends Error {
  constructor() {
    super('Booking not found');
  }
}

export class ExpenseNotFoundError extends Error {
  constructor() {
    super('Expense not found');
  }
}

export class ItineraryItemNotFoundError extends Error {
  constructor() {
    super('Itinerary item not found');
  }
}

export class DestinationNotFoundError extends Error {
  constructor() {
    super('Destination not found');
  }
}
