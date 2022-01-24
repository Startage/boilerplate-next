import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthContext } from '@/common/contexts/auth-context';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const LogoutConfirmation = ({ isOpen, handleClose }: Props) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>Deseja sair?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button
          onClick={() => {
            logout();
            handleClose();
            router.replace(PAGE_AUTH_LOGIN);
          }}
          autoFocus
        >
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogoutConfirmation };
