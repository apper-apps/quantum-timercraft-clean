import React from 'react';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ColorPicker from '@/components/atoms/ColorPicker';
import Toggle from '@/components/atoms/Toggle';

const FormField = ({ type, ...props }) => {
  switch (type) {
    case 'select':
      return <Select {...props} />;
    case 'color':
      return <ColorPicker {...props} />;
    case 'toggle':
      return <Toggle {...props} />;
    default:
      return <Input type={type} {...props} />;
  }
};

export default FormField;