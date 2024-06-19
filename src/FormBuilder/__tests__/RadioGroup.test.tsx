import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import FormContext from '../FormContext';
import { FormRadioGroup } from '../components';
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
        <FormRadioGroup 
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

describe('FormRadioGroup', () => {
  it('renders radio group with items', async () => {
    renderComponent();

    const radioBtn = screen.getByLabelText('name1');
    await userEvent.click(radioBtn);
    expect(radioBtn).toBeChecked();
  });

  it('renders all radio items', () => {
    renderComponent();

    const radioBtn1 = screen.getByLabelText('name1');
    const radioBtn2 = screen.getByLabelText('name2');

    expect(radioBtn1).toBeInTheDocument();
    expect(radioBtn2).toBeInTheDocument();
  });

  it('checks that no radio button is selected initially', () => {
    renderComponent();

    const radioBtn1 = screen.getByLabelText('name1');
    const radioBtn2 = screen.getByLabelText('name2');

    expect(radioBtn1).not.toBeChecked();
    expect(radioBtn2).not.toBeChecked();
  });

  it('allows selection of different radio button', async () => {
    renderComponent();

    const radioBtn1 = screen.getByLabelText('name1');
    const radioBtn2 = screen.getByLabelText('name2');

    await userEvent.click(radioBtn1);
    expect(radioBtn1).toBeChecked();
    expect(radioBtn2).not.toBeChecked();

    await userEvent.click(radioBtn2);
    expect(radioBtn2).toBeChecked();
  });

  it('retains selected radio button on re-render', async () => {
    const { rerender } = render(<WrapperComponent />);

    const radioBtn1 = screen.getByLabelText('name1');

    await userEvent.click(radioBtn1);
    expect(radioBtn1).toBeChecked();

    rerender(<WrapperComponent />);
    expect(screen.getByLabelText('name1')).toBeChecked();
  });
})