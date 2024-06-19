import React from 'react';
import { screen, render } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormContext from '../FormContext';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { FormAutoComplete } from '../components';

const schema = yup.object().shape({
  test: yup.string().required('This field is required').min(3, 'Minimum 3 characters'),
});

const WrapperComponent = () => {
  const ctx = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      test: '', 
    },
  });

  return (
    <FormContext.Provider value={{ ctx, state: { status: 'init' }, setState: jest.fn(), schema }}>
      <FormProvider {...ctx}>
        <FormAutoComplete 
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

describe('FormAutoComplete', () => {
  it('renders input', async () => {
    render(<WrapperComponent />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('checks that input is empty initially', () => {
    render(<WrapperComponent />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('renders all dropdown items', async () => {
    render(<WrapperComponent />);

    await userEvent.click(screen.getByLabelText('Test *'));
    expect(screen.getByText('name1')).toBeInTheDocument();
    expect(screen.getByText('name2')).toBeInTheDocument();
  });
});
