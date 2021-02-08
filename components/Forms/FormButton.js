import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

export default function FormButton({ title,color }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton color={color} title={title} onPress={handleSubmit} />;
}
