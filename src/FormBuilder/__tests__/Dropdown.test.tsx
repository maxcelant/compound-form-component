import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormDropdown } from '../components'; 
import userEvent from '@testing-library/user-event';
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
        <FormDropdown 
          name="test"
          items={[
            { name: 'name1', value: 'value1' },
            { name: 'name2', value: 'value2' },
          ]}
        />
      </FormProvider>
    </FormContext.Provider>
  );
};

const renderComponent = () => render(<WrapperComponent />);

describe('FormDropdown', () => {
  it('renders dropdown with items', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: 'test-dropdown' }));
    await userEvent.click(screen.getByRole('option', { name: 'test-option-value1' }));
    expect(screen.getByLabelText('test-dropdown')).toHaveTextContent('name1');
  });

  it('renders all dropdown items', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: 'test-dropdown' }));
    expect(screen.getByRole('option', { name: 'test-option-value1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'test-option-value2' })).toBeInTheDocument();
  });

  it('checks that no dropdown item is selected initially', () => {
    renderComponent();

    const dropdown = screen.getByRole('button', { name: 'test-dropdown' });
    expect(dropdown).not.toHaveTextContent('name1');
    expect(dropdown).not.toHaveTextContent('name2');
  });
});
