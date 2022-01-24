import React from 'react';
import { IMaskInput } from 'react-imask';

export const PhoneMask = React.forwardRef(function TextMaskCustom(
  props: any,
  ref: any,
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      unmask={true}
      mask={[
        {
          mask: '(00) 0000-0000',
        },
        {
          mask: '(00) 00000-0000',
        },
      ]}
      dispatch={(appended: any, dynamicMasked: any) => {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');

        if (!number) return dynamicMasked.compiledMasks[0];

        return number.length <= 10
          ? dynamicMasked.currentMask
          : dynamicMasked.compiledMasks[1];
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
