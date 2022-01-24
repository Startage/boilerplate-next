import { PendingEmailConfirmationErrorName } from '@/common/consts/errors';

export class PendingEmailConfirmationError extends Error {
  constructor() {
    super('Aguardando confirmação do email');
    this.name = PendingEmailConfirmationErrorName;
  }
}
