import { Link } from '@/common/components';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { AuthTemplate } from '@/common/templates/auth-template';
import { SignupForm } from '@/modules/auth/components/signup-form';
import { Typography } from '@mui/material';

export default function Signup() {
  return (
    <AuthTemplate title={'Cadastrar'} subTitle={'Informe os dados de cadastro'}>
      <SignupForm />
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Já possui conta? <Link href={PAGE_AUTH_LOGIN}>Começar</Link>
      </Typography>
    </AuthTemplate>
  );
}
