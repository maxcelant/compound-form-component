import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormBlock } from '../components'; 
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
        <FormBlock />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormBlock', () => {
  it('renders block', () =>{
    render(<WrapperComponent />);
    expect(screen.getByLabelText('form-block')).toBeInTheDocument();
  })
});