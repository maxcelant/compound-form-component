import { ButtonProps } from "@material-ui/core"
import { GitHubTeamSchema, NOTIFICATION_OPTIONS, VISIBILITY_OPTIONS } from "./schema"
import Form from "../FormBuilder/FormBuilder"

const buttonOptions: ButtonProps = {
  variant: 'outlined',
  fullWidth: true,
}

export const MyForm = () => {

  return (
    <Form schema={GitHubTeamSchema}>
      <Form.ErrorAlert />
      <Form.SuccessAlert message='GitHub Team created!' />
      <Form.Row>
        <Form.Input name='teamName' />
        <Form.Input name='description' />
        <Form.Input name='username' />
      </Form.Row>
      <Form.Row>
        <Form.Dropdown name='visibility' items={VISIBILITY_OPTIONS} />
        <Form.Dropdown name='notificationSetting' items={NOTIFICATION_OPTIONS} />
        <Form.ShortName name='shortName' />
      </Form.Row>
      <Form.RadioGroup 
        name='pci' 
        direction='row'
        size={6}
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