import Form from "./Form/Form"
import { GitHubTeamSchema } from "./schema"

export const MyForm = () => {
  return (
    <Form schema={GitHubTeamSchema}>
      <Form.ErrorAlert />
      <Form.SuccessAlert message='GitHub Team created!' />
      <Form.Row>
        <Form.Input name='teamName' />
        <Form.Input name='description' />
      </Form.Row>
      <Form.Row>
        <Form.Input name='username' />
        <Form.Input name='authority' />
      </Form.Row>
      <Form.Row>
        <Form.ShortName name='shortName' />
        <Form.Dropdown  name='notificationSetting' items={[
          { name: 'Disabled', value: 'notifications_disabled' },
          { name: 'Enabled',  value: 'notifications_enabled' },
        ]} />
      </Form.Row>
      <Form.RadioGroup name='pci' direction='row' items={[
        { name: 'PCI', value: 'pci'},
        { name: 'Non-PCI', value: 'non-pci'}
      ]} />
      <Form.Submit 
        options={{
          variant: 'outlined',
          color: 'primary',
          fullWidth: true
        }}
        onSubmit={async (data: any) => console.log('submitted', data)}
      />
    </Form>
  ) 
}