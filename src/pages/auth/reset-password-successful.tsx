import { Link } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import React from 'react';

export default function ResetPasswordSuccessful() {
  return (
    <AuthTemplate
      title={'Pronto!'}
      subTitle={
        'Senha alterada com sucesso! Agora é só efetuar o login para acessar novamente a plataforma.'
      }
    >
      <Link href={PAGE_AUTH_LOGIN}>LOGIN</Link>
    </AuthTemplate>
  );
}
