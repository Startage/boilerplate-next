import { AuthTemplate } from '@/common/templates/auth-template';
import { ApplyResetPasswordForm } from '@/modules/auth/components/apply-reset-password-form';

export default function ApplyResetPassword() {
  return (
    <AuthTemplate
      title={'Redefinir senha'}
      subTitle={'Informe uma nova senha para realizar a alteração'}
    >
      <ApplyResetPasswordForm />
    </AuthTemplate>
  );
}
