export class NetworkError extends Error {
  constructor(message = "Network error") {
    super(message);
    this.name = "NetworkError";

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
