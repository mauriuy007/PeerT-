export class UnauthorizedError extends Error {
  constructor() {
    super('Authentication required');
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super('You do not have permission to perform this action');
  }
}
