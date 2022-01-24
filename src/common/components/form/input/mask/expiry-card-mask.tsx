import IMask from 'imask';
import React from 'react';
import { IMaskInput } from 'react-imask';

export const ExpiryCardMask = React.forwardRef(function TextMaskCustom(
  props: any,
  ref: any,
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      unmask={true}
      mask={'00/00'}
      pattern={'m/`Y'}
      blocks={{
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 20,
          to: 99,
        },
      }}
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
