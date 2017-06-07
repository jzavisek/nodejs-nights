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

module.exports = {
  AppError,
  ValidationError,
}
