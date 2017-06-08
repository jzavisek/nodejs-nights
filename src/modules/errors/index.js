'use strict'

class AppError extends Error {
  constructor(type, message, status) {
    super(message)
    this.type = type
    this.status = status
  }
}

class ValidationError extends AppError {
  constructor(errors = []) {
    super('Validation', 'Invalid data format.', 400)
    this.errors = errors
  }
}

class NotFound extends AppError {
  constructor(type = 'NotFound', message = 'Requested resources was not found.') {
    super(type, message, 404)
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFound,
}
