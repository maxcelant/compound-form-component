import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormErrorAlert } from '../components';
import React from 'react';

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormErrorAlert />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormErrorAlert', () => {
  it('renders error alert', () => {
    render(<WrapperComponent />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    render(
      <FormContext.Provider value={{ ctx: {} as any, schema: {} as any, setState: jest.fn(), state: { status: 'error', message: 'error message' }}}>
        <FormErrorAlert />
      </FormContext.Provider>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('error message');
  });

  it('does not render error alert if status is not error', () => {
    render(
      <FormContext.Provider value={{ ctx: {} as any, schema: {} as any, setState: jest.fn(), state: { status: 'success', message: 'success message' } as any }}>
        <FormErrorAlert />
      </FormContext.Provider>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});