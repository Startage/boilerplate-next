import React from 'react';
import { IMaskInput } from 'react-imask';

export const CpfCnpjMask = React.forwardRef(function TextMaskCustom(
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
          mask: '000.000.000-00',
        },
        {
          mask: '00.000.000/0000-00',
        },
      ]}
      dispatch={(appended: any, dynamicMasked: any) => {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');

        return number.length <= 11
          ? dynamicMasked.compiledMasks[0]
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
