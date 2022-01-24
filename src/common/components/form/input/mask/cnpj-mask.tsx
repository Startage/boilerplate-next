import React from 'react';
import { IMaskInput } from 'react-imask';

export const CnpjMask = React.forwardRef(function TextMaskCustom(
  props: any,
  ref: any,
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      unmask={true}
      mask={'00.000.000/0000-00'}
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
