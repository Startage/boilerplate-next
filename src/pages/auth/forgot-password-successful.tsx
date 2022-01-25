import { Link } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import React from 'react';

export default function SignupSuccessful() {
  return (
    <AuthTemplate
      title={'Estamos quase!'}
      subTitle={
        'Encaminhamos um email para sua caixa de entrada para realizar a alteração da sua senha'
      }
    >
      <Link href={PAGE_AUTH_LOGIN}>LOGIN</Link>
    </AuthTemplate>
  );
}
