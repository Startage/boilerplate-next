import { Link } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import React from 'react';

export default function SignupSuccessful() {
  return (
    <AuthTemplate
      title={'Cadastro efetuado com sucesso'}
      subTitle={'Acesse seu email para realizar a confirmação da conta'}
    >
      <Link href={PAGE_AUTH_LOGIN}>LOGIN</Link>
    </AuthTemplate>
  );
}
