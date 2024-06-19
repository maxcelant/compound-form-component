import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormToolTip } from '../components'; 
import React from 'react';
import userEvent from '@testing-library/user-event';

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormToolTip message='test' />
      </FormProvider>
    </FormContext.Provider>
  );
};

describe('FormToolTip', () => {
  it('renders tooltip', () =>{
    render(<WrapperComponent />);
    expect(screen.getByLabelText('form-tooltip-test')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(<WrapperComponent />);
    await userEvent.hover(screen.getByLabelText('form-tooltip-test'));
    expect(await screen.findByText('test')).toBeInTheDocument();
  });
});