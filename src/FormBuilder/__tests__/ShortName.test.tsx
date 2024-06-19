import React from 'react';
import { screen, render } from '@testing-library/react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormContext from '../FormContext';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { FormShortName } from '../components';

jest.mock('../../../components/CmdbAppShortName/CmdbAppShortName', () => ({
  CmdbAppShortName: ({ onChange, onBlur, required }: any) => (
    <input
      aria-label='short-name'
      onChange={(e) => onChange({ shortName: e.target.value })}
      onBlur={onBlur}
      required={required}
    />
  ),
}));

const schema = yup.object().shape({
  test: yup.string().required(),
});

let ctx: UseFormReturn<{
  test: string;
}, any, undefined>;

const WrapperComponent = () => {
  ctx = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema }}>
      <FormProvider {...ctx}>
        <FormShortName name='test' />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormInput', () => {
  it('renders shortname', async () => {
    render(<WrapperComponent />);
    expect(await screen.findByLabelText('form-shortname')).toBeInTheDocument();
  });

  it('updates value in form', async () => {
    render(<WrapperComponent />);
    const input = await screen.findByLabelText('short-name');
    await userEvent.type(input, 'test');
    expect(ctx.getValues()).toEqual({ test: 'test' });
  })
});
