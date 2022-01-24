import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import { httpConfirmationEmail } from '@/modules/auth/api/confirm-email/http-confirm-email';
import { ExpiredTokenConfirmationEmail } from '@/modules/auth/components/expired-token-confirmation-email';
import { ConfirmEmailData } from '@/modules/auth/types/confirm-email-data';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function ConfirmEmail() {
  const router = useRouter();
  const {
    query: { token },
  } = router;

  const { mutate, error, isLoading } = useMutation(httpConfirmationEmail, {
    onSuccess: () => {
      router.replace(PAGE_AUTH_LOGIN);
    },
  });

  useEffect(() => {
    if (token) {
      mutate({
        token: token as string,
      });
    }
  }, [token]);

  return (
    <AuthTemplate title={'Confirmação de email'} subTitle={''}>
      {isLoading && <CircularProgress />}
      {!isLoading && !error && (
        <Stack spacing={3}>
          <Typography color={'primary'} variant={'h4'}>
            E-mail confirmado com sucesso!
          </Typography>
          <Typography variant={'h6'}>
            Agora você já pode efetuar o login
          </Typography>
        </Stack>
      )}
      {error && <ExpiredTokenConfirmationEmail />}
    </AuthTemplate>
  );
}
