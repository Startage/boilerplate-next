import React from 'react';
import { IMaskInput } from 'react-imask';

export const CreditCardMask = React.forwardRef(function TextMaskCustom(
  props: any,
  ref: any,
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      unmask={true}
      mask={'0000 0000 0000 0000'}
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({
          target: {
            name: other.name,
            value: value,
          },
        });
      }}
    />
  );
});
