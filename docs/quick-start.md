1. You will first need to create your `yup` schema. You can learn more about yup object schemas [here](https://www.npmjs.com/package/yup/v/1.0.0-alpha.3#object). I will create a basic one to get us started.

```ts
const accountInfoSchema = yup.object({
  username: yup.string().required(),
  gender: yup.string().oneOf(genderOptions.map(g => g.value)).required(),
  birthdate: yup.date().required(),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required(),
  password: yup.string().required().min(6),
});
```
2. Next you will have to create a component that will contain your form. It will need to be a `jsx/tsx` component and use the `useFormBuilder` hook, passing in that schema.

```ts
import { accountInfoSchema } from './schema';

const myForm = () => {
  const Form = useFormBuilder(accountInfoSchema);
  ...
}
```
3. Design your form utilizing different components of your choice.

```ts
const myForm = () => {
  const Form = useFormBuilder(accountInfoSchema);

  return (
    <Form>
      <Form.Row>
        <Form.Input name="username" />
        <Form.RadioGroup 
          name="gender"
          items={[
            { name: "M", value: "male" }, 
            { name: "F", value: "female" }
          ]} 
        />
        <Form.Input name="birthdate" />
      </Form.Row>
      <Form.Row>
        <Form.Input name="phone" />
        <Form.Input name="password" />
        <Form.Block />
      </Form.Row>
      <Form.Row>
	    <Form.SubmitButton
	      onSubmit={async data => {
	        console.log(data);
	      }}
	    />
      </Form.Row>
    </Form>
  )
}
```
4. Call your form component

```ts
import { MyForm } from './MyForm';

const App = () => {
  return (
    <>
      <MyForm />
    </>
  )
}
```