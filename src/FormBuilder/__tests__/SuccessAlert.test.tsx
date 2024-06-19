import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import React from 'react';
import { FormSuccessAlert } from '../components';

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormSuccessAlert message='test success message' />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormSuccessAlert', () => {
  it('renders success alert', () => {
    render(<WrapperComponent />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    render(
      <FormContext.Provider value={{ ctx: {} as any, schema: {} as any, setState: jest.fn(), state: { status: 'success' }}}>
        <FormSuccessAlert message='test success message'/>
      </FormContext.Provider>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('test success message');
  });

  it('does not render success alert if status is not success', () => {
    render(
      <FormContext.Provider value={{ ctx: {} as any, schema: {} as any, setState: jest.fn(), state: { status: 'loading' }}}>
        <FormSuccessAlert message='test success message'/>
      </FormContext.Provider>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});