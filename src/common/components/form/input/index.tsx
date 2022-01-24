import { CnpjMask } from '@/common/components/form/input/mask/cnpj-mask';
import { CpfCnpjMask } from '@/common/components/form/input/mask/cpf-cnpj-mask';
import { CpfMask } from '@/common/components/form/input/mask/cpf-mask';
import { CreditCardMask } from '@/common/components/form/input/mask/credit-card-mask';
import { ExpiryCardMask } from '@/common/components/form/input/mask/expiry-card-mask';
import { PhoneMask } from '@/common/components/form/input/mask/phone-mask';
import { PostalCodeMask } from '@/common/components/form/input/mask/postal-code-mask';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Field } from 'formik';
import { FieldAttributes } from 'formik/dist/Field';
import React from 'react';

import { CurrencyMask } from './mask/currency-mask';

export type MasksTypes =
  | 'phone'
  | 'cpf'
  | 'cnpj'
  | 'cpfCnpj'
  | 'money'
  | 'postalCode'
  | 'creditCard'
  | 'expiryCard';

const masksByType = {
  phone: PhoneMask,
  cpf: CpfMask,
  cnpj: CnpjMask,
  cpfCnpj: CpfCnpjMask,
  money: CurrencyMask,
  postalCode: PostalCodeMask,
  creditCard: CreditCardMask,
  expiryCard: ExpiryCardMask,
};

export type InputProps = TextFieldProps & {
  name: string;
  mask?: MasksTypes;
};

const Input = ({
  label,
  mask,
  variant = 'filled',
  name,
  InputProps = {},
  ...props
}: InputProps) => {
  return (
    <Field name={name}>
      {({
        field: { name, value, onChange, onBlur }, // { name, value, onChange, onBlur }
        form: { touched, errors, validateField }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: FieldAttributes<any>) => (
        <TextField
          label={label}
          {...props}
          variant={variant}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          error={!!(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
          InputProps={{
            inputComponent: mask
              ? masksByType[mask]
              : InputProps.inputComponent,
            ...InputProps,
          }}
        />
      )}
    </Field>
  );
};

export { Input };
