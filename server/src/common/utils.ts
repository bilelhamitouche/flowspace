import { InternalServerErrorException } from '@nestjs/common';

export async function dbExecute<T>(
  promise: Promise<T>,
  message: string,
): Promise<T> {
  try {
    return await promise;
  } catch {
    throw new InternalServerErrorException(message);
  }
}
