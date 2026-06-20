export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('Email is already in use');
  }
}

export class UserAlreadyInTripError extends Error {
  constructor() {
    super('User is already a participant in this trip');
  }
}
