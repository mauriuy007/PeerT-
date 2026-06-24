export class ExternalServiceError extends Error {
  constructor(message = 'External service error') {
    super(message);
  }
}
