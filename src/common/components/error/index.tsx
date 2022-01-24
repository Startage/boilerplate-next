import { Typography } from '@mui/material';

type Props = {
  error: any;
  className?: string;
};
const Error = ({ className, error }: Props) => {
  if (!error) return null;

  return (
    <Typography className={className} color={'error'}>
      {error?.message}
    </Typography>
  );
};

export { Error };
