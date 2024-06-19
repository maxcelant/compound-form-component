import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormBlock, FormRow } from '../components'; 
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
        <FormRow>
          <FormBlock />
        </FormRow>
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormRow', () => {
  it('renders row with subcomponent', () =>{
    render(<WrapperComponent />);
    expect(screen.getByLabelText('form-row')).toBeInTheDocument();
    expect(screen.getByLabelText('form-block')).toBeInTheDocument();
  });
});