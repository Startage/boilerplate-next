import { Link as MUILink, LinkBaseProps } from '@mui/material';
import NextLink from 'next/link';

type Props = {
  href: string;
} & LinkBaseProps;

const Link = ({ children, href, ...props }: Props) => (
  <NextLink href={href} passHref>
    <MUILink {...props}>{children}</MUILink>
  </NextLink>
);

export { Link };
