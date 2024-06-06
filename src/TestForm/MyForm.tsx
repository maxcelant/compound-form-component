import { ButtonProps } from "@material-ui/core"
import { GitHubTeamSchema, NOTIFICATION_OPTIONS, VISIBILITY_OPTIONS } from "./schema"
import FormBuilder from "../FormBuilder/FormBuilder"

const buttonOptions: ButtonProps = {
  variant: 'outlined',
  fullWidth: true,
}

export const MyForm = () => {
  const Form = FormBuilder(GitHubTeamSchema)
  return (
    <Form>
      <Form.ErrorAlert />
      <Form.SuccessAlert message='GitHub Team created!' />
      <Form.Row>
        <Form.Input name='teamName'>
          <Form.ToolTip message='some foo msg'/> 
        </Form.Input>
        <Form.Input name='description' />
        <Form.Input name='username' />
      </Form.Row>
      <Form.Divider />
      <Form.Row>
        <Form.Dropdown name='visibility' items={VISIBILITY_OPTIONS}>
          <Form.ToolTip message='some foo msg'/> 
        </Form.Dropdown>
        <Form.Dropdown name='notificationSetting' items={NOTIFICATION_OPTIONS} />
        <Form.ShortName name='shortName' />
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
          options={buttonOptions}
          onSubmit={async (data: any) => console.log('submitted', data)}
        />
        <Form.Block />
        <Form.ClearButton options={buttonOptions} />
      </Form.Row>
    </Form>
  ) 
}