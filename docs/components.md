### Row
Use this component to encapsulate 1 or more children components in a single row.

**Props**:

- `children`: 1 or more subcomponents.
- `spacing?`: Space between each component in a row.

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.Input name="foo" />
    <Form.Input name="bar" />
    <Form.Input name="baz" />
  </Form.Row>
</Form>
```

---
### Divider
Use this component to create a vertical divider in your form.

**Props**:

- `style?`: optional style for your divider.

**Usage:**

```ts
<Form>
  <Form.Row>
    ...
  </Form.Row>
  <Form.Divider/> /* Add a vertical divider */
  <Form.Row>
    ...
  </Form.Row>
</Form>
```

---
### Block
Use this component to create a block of empty space.

**Props**:

- `size?`: optional block size (default to 4).
- `style?`: optional style for the block.

**Usage:**

```ts
<Form>
  <Form.Row>
	  <Form.Input name="foo" />
    <Form.Block /> /* Add a block between the two inputs */
    <Form.Input name="bar" />
  </Form.Row>
</Form>
```

---
### Input
Use this component to capture a string entered by the user.

**Props**:

- `name`: name of field in your schema.
- `title?`: optional title of input component (defaults to capitalized field name).
- `style?`: optional style of input component.
- `options?`: MUI input component options.
- `children?`: optional tooltip.
- `size?`: size of component (defaults to 4).

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.Input name="foo" />
  </Form.Row>
</Form>
```

---
### Dropdown
Use this component to capture a option from a selection of items.

**Props**:

- `name`: name of field in your schema.
- `title`: optional title of dropdown component (defaults to capitalized field name).
- `items`: items to display in your dropdown.
- `style?`: optional style of dropdown component.
- `options?`: MUI dropdown component options.
- `children?`: optional tooltip.
- `size?`: size of component (defaults to 4).`

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.Dropdown 
      name="environments"
      items={[
        { name: 'Prod',     value: 'p' },
        { name: 'Non-Prod', value: 'n' },
        { name: 'Dev',      value: 'd' }
      ]} 
    />
  </Form.Row>
</Form>
```

---
### RadioGroup
Use this component to create a radio group of items.

**Props**:

- `name`: name of field in your schema.
- `title`: optional title of radio group component (defaults to capitalized field name).
- `items`: items to display in your radio group.
- `style?`: optional style of radio group component.
- `options?`: MUI radio group component options.
- `children?`: optional tooltip.
- `size?`: size of component (defaults to 4).
- `direction?`: radio group direction (defaults to 'column').

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.RadioGroup 
      name="environments"
      items={[
        { name: 'Prod',     value: 'p' },
        { name: 'Non-Prod', value: 'n' },
        { name: 'Dev',      value: 'd' }
      ]} 
    />
  </Form.Row>
</Form>
```

---
### AutoComplete
Use this component to capture a string from the user with autocompletion.

**Props**:

- `name`: name of field in your schema.
- `title`: optional title of autocomplete component (defaults to capitalized field name).
- `items`: items to display in your radio group.
- `style?`: optional style of autocomplete component.
- `options?`: MUI autocomplete component options.
- `children?`: optional tooltip.
- `size?`: size of component (defaults to 4).

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.AutoComplete 
      name="environments"
      items={[
        { name: 'Prod',     value: 'p' },
        { name: 'Non-Prod', value: 'n' },
        { name: 'Dev',      value: 'd' }
      ]} 
    />
  </Form.Row>
</Form>
```

---
### DynamicList
Use this component to create a list of items entered by the user.

**Props**:

- `name`: name of the field in your schema.
- `title`: title of the component.
- `buttonTitle?`: text of your dynamic list button (defaults to 'Add').
- `options?`: MUI options for the textfield.
- `children?`: optional tool tip.
- `size?`: optional size of component (defaults to 4).

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.DynamicList 
      name="users"
      title="Team Users"
      buttonTitle="Add User"
    />
  </Form.Row>
</Form>
```

---
### ToolTip
Use this component to add a tooltip to an existing component. **_Warning: Only some components can utilize the tooltip._**

**Props**:

- `message`: The text you want to appear in your tooltip.
- `style?`: optional style for your tooltip.
- `options?`: MUI options for your tooltip.

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.Input name="foo">
      <Form.ToolTip message="important tooltip!" /> /* wrap it inside your component! */
    </Form.Input>
  </Form.Row>
</Form>
```

---
### SuccessAlert
Use this component to display a successful alert in your form.

**Props**:

- `message`: text to display in your alert.
- `style?`: optional style for your alert.
- `size?:` optional size of alert (default to 12).

**Usage:**

```ts
<Form>
  <Form.SuccessAlert message="successfully created!" />
  <Form.Row>
	...
  </Form.Row>
  <Form.SubmitButton ... />
</Form>
```

---
### ErrorAlert
Use this component to display an error alert in your form. It will display the error captured from the submit button's `onSubmit` request.

**Props**:

- `style?`: optional style for your alert.
- `size?:` optional size of alert (default to 12).

**Usage:**

```ts
<Form>
  <Form.ErrorAlert />
  <Form.Row>
	...
  </Form.Row>
  <Form.SubmitButton ... />
</Form>
```

---
### ClearButton
Use this component to clear the form.

**Props**:

- `title?`: optional title (default to 'Clear').
- `size?:` optional size (default to 4).
- `style?`: optional styling of the button.
- `options?`: MUI button options.

**Usage:**

```ts
<Form>
  <Form.Row>
	...
  </Form.Row>
  <Form.ClearButton />
</Form>
```

---
### SubmitButton
Use this component to submit the form.

**Props**:

- `onSubmit`: async callback function to execute when form is submitted.
- `title?`: optional title of button (default to 'Submit').
- `size?`: optional size of button (default to 4).

**Usage:**

```ts
<Form>
  ...
  <Form.SubmitButton 
    title="submit me!"
    onSubmit={async data => {
      console.log(data)
    }}
  />
</Form>
```

---
### DynamicText
Use this component to create a dynamic string utilizing form data.

**Props**:

- `title`: title of the dynamic text component.
- `renderCallback`: string you want to be rendered.
- `severity?`: optional severity type of your component (defaults to 'info').
- `style?`: optional style for dynamic text component.
- `size?`: optional size of component (defaults to 12).

**Usage:**

```ts
<Form>
  <Form.Row>
    <Form.Input name="foo" />
    <Form.Input name="bar" />
    <Form.Input name="baz" />
  </Form.Row>
  <Form.DynamicText
    title="Your new group name"
    renderCallback={data => {
      return `${data.foo}-${data.bar}-${data.baz}`;
    }}
  />
</Form>
```
