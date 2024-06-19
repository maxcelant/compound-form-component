import useFormBuilder from "../FormBuilder/useFormBuilder";
import { GitHubTeamSchema, NOTIFICATION_OPTIONS, VISIBILITY_OPTIONS } from "./schema"

export const MyForm = () => {
  const Form = useFormBuilder(GitHubTeamSchema);
  return (
    <Form>
      <Form.SuccessAlert message='GitHub Team created!' />
      <Form.Row>
        <Form.Input name='teamName'>
          <Form.ToolTip message="your github team" />
        </Form.Input>
        <Form.Input name='description' />
        <Form.Input name='username' />
      </Form.Row>
      <Form.Divider />
      <Form.Row>
        <Form.Dropdown name='visibility' items={VISIBILITY_OPTIONS}/>
        <Form.Dropdown name='notificationSetting' items={NOTIFICATION_OPTIONS} />
        <Form.ShortName name='shortName' />
      </Form.Row>
      <Form.Row>
        <Form.DynamicList name='owners' />
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
          onSubmit={async (data: any) => console.log('submitted', data)}
        />
        <Form.Block />
        <Form.ClearButton />
      </Form.Row>
    </Form>
  ) 
}