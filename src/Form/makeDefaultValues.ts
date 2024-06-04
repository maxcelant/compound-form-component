import { DefaultValues, FieldValues } from 'react-hook-form';
import * as yup from 'yup';

export default function makeDefaultValues<T extends FieldValues>(schema: yup.ObjectSchema<T>): DefaultValues<T> {
  const defaultValues: any = {};
  const shape = schema.describe().fields;

  const shapeMap: any = {
    'string': '',
    'number': 0,
    'boolean': false,
    'array': [],
    'object': {}
  }

  for (const key in shape) {
    if (shape[key].type in shapeMap) {
      defaultValues[key] = shapeMap[shape[key].type]
    } else {
      defaultValues[key] = null
    }
  }

  return defaultValues;
}