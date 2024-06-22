# useFormBuilder

A React hook that allows you to create a dynamic form from building blocks of your choice. All the pieces are pre-configured `material-ui` components like `Select`, `RadioGroup`, etc.

Everything is customizable, but this provides a simpler way to quickly create forms.

### Setup

In order to use the `FormBuilder`, you need to establish a `yup` schema for your form fields. This will include things like validation for those fields as well.

As sample schema may look like this:

```tsx
export const GitHubTeamSchema = yup.object({
  teamName: yup
    .string()
    .required()
    .matches(
      /^(?![-.])[a-zA-Z0-9-. ]{1,255}(?<![.])$/g,
      "Invalid team name. Please adhere to GitHub's naming conventions.",
    ),
  description: yup.string(),
  username: yup.string().required(),
  pci: yup.string().required(),
  visibility: yup
    .string()
    .oneOf(VISIBILITY_OPTIONS.map(o => o.value))
    .required(),
  notificationSetting: yup
    .string()
    .oneOf(NOTIFICATION_OPTIONS.map(o => o.value))
    .required(),
});
```

### Example

As you can see, it currently supports `Input`, `Dropdown`, `Row`, `RadioGroup`, `Divider`, `ToolTip` and more.

```tsx
export const MyForm = () => {
  const Form = useFormBuilder(GitHubTeamSchema)
  return (
    <Form>
      <Form.ErrorAlert />
      <Form.SuccessAlert message='GitHub Team created!' />
      <Form.Row>
        <Form.Input name='teamName'>
          <Form.ToolTip message='The name of your github team'>
        </Form.Input>
        <Form.Input name='description' />
        <Form.Input name='username' />
      </Form.Row>
      <Form.Divider />
      <Form.Row>
        <Form.Dropdown name='visibility' items={VISIBILITY_OPTIONS}/>
        <Form.Dropdown name='notificationSetting' items={NOTIFICATION_OPTIONS} />
      </Form.Row>
      <Form.RadioGroup 
        name='pci' 
        direction='row'
        items={[
          { name: 'PCI', value: 'pci'},
          { name: 'Non-PCI', value: 'non-pci'},
        ]} 
      />
      <Form.Row>
        <Form.SubmitButton
          options={{
            variant: 'outlined',
            fullWidth: true,
          }}
          onSubmit={async (data: any) => console.log('submitted', data)}
        />
        <Form.Block />
        <Form.ClearButton />
      </Form.Row>
    </Form>
  ) 
}
```
