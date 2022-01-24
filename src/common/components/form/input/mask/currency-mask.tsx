import React from 'react';
import NumberFormat from 'react-number-format';

const CurrencyMask = React.forwardRef(function NumberFormatCustom(
  props: any,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      decimalScale={2}
      isNumericString
      prefix=""
    />
  );
});

export { CurrencyMask };
