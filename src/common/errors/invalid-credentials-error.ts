import { InvalidCredentialsErrorName } from '@/common/consts/errors';

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inválidas');
    this.name = InvalidCredentialsErrorName;
  }
}
