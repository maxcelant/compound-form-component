import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormDynamicText } from '../components'; 
import React from 'react';

const WrapperComponent = () => {
  const ctx = useForm({
    defaultValues: {
      test: 'foo', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema: {} as any }}>
      <FormProvider {...ctx}>
        <FormDynamicText 
          title="Test Title"
          renderCallback={data => {
            return `${data.test}-test`
          }}
        />
      </FormProvider>
    </FormContext.Provider>
  );
};

const renderComponent = () => render(<WrapperComponent />);

describe('FormDynamicText', () => {
  it('renders dynamic text title', async () => {
    renderComponent();
    expect(screen.getByLabelText("dynamic-text-title")).toHaveTextContent('Test Title');
  });

  it('renders dynamic text', async () => {
    renderComponent();
    expect(screen.getByLabelText("dynamic-text")).toHaveTextContent('foo-test');
  })
});
