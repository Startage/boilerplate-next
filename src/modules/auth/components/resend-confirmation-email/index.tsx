import { Error } from '@/common/components';
import { httpResendConfirmationEmail } from '@/modules/auth/api/resend-confirm-email/http-resend-confirm-email';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  email: string;
};

const ResendConfirmationEmail = ({ isOpen, handleClose, email }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, error, isLoading } = useMutation(
    httpResendConfirmationEmail,
    {
      onSuccess: () => {
        enqueueSnackbar('Verifique seu email para realizar a confirmação', {
          variant: 'success',
        });
        handleClose();
      },
    },
  );

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>E-mail não confirmado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          O e-mail informado não está confirmado, enviar novamente?
        </DialogContentText>
        <Error error={error} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => {
            mutate({
              email,
            });
          }}
          autoFocus
        >
          Enviar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export { ResendConfirmationEmail };
