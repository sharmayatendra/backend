export class ApiError extends Error {
  statusCode: number;
  data: null;
  errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.stack = stack;
    this.errors = errors;
  }
}
