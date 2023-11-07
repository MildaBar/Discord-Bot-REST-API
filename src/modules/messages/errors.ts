export class messageFormationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "messageFormationError";
  }
}

export class messageSendingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "messageSendingError";
  }
}

export class messageStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "messageStorageError";
  }
}
