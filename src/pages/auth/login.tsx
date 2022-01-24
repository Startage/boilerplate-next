import { Link } from '@/common/components';
import { PAGE_AUTH_SIGNUP } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import { LoginForm } from '@/modules/auth/components/login-form';
import { Typography } from '@mui/material';
import React from 'react';

export default function Login() {
  return (
    <AuthTemplate title={'LOGIN'} subTitle={'Entre com seus dados'}>
      <LoginForm />
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Não possui conta? <Link href={PAGE_AUTH_SIGNUP}>Começar</Link>
      </Typography>
    </AuthTemplate>
  );
}
