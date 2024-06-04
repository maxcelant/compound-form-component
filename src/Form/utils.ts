import { DefaultValues, FieldValues } from 'react-hook-form';
import * as yup from 'yup';

export function makeDefaultValues<T extends FieldValues>(schema: yup.ObjectSchema<T>): DefaultValues<T> {
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

export function toCapital(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');
}