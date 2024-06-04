import Form from "../Form/Form"
import { GitHubTeamSchema, NOTIFICATION_OPTIONS, VISIBILITY_OPTIONS } from "./schema"

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
        <Form.Dropdown name='visibility' items={VISIBILITY_OPTIONS} />
        <Form.Dropdown name='notificationSetting' items={NOTIFICATION_OPTIONS} />
      </Form.Row>
      {/* <Form.RadioGroup name='pci' direction='row' items={[
        { name: 'PCI', value: 'pci'},
        { name: 'Non-PCI', value: 'non-pci'}
      ]} /> */}
      <Form.Submit 
        options={{
          variant: 'outlined',
          fullWidth: true
        }}
        onSubmit={async (data: any) => console.log('submitted', data)}
      />
    </Form>
  ) 
}