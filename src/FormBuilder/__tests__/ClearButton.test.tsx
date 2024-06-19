import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormClearButton } from '../components';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../utils', () => ({
  makeDefaultValues: jest.fn(() => ({ test: '' })),
}));

const reset = jest.fn();

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx: {...ctx, reset }, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormClearButton />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormClearButton', () => {
  it('renders clear button', () => {
    render(<WrapperComponent />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears form on click', async () => {
    render(<WrapperComponent />);
    await userEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
}); 