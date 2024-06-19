import { screen, render, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormSubmitButton } from '../components';
import React from 'react';
import userEvent from '@testing-library/user-event';

const handleSubmit = jest.fn();

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx: {...ctx, handleSubmit}, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormSubmitButton onSubmit={async (data: any) => data} />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormSubmitButton', () => {
  it('renders submit button', () => {
    render(<WrapperComponent />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('disables button when form is invalid', () => {
    render(<WrapperComponent />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
  
  it('submits form on click', async () => {
    render(<WrapperComponent />);
    handleSubmit.mockReset();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
    });
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});