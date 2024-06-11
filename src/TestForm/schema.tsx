import * as yup from 'yup';

export const NOTIFICATION_OPTIONS = [
  { name: 'Disabled', value: 'notifications_disabled' },
  { name: 'Enabled', value: 'notifications_enabled' },
];

export const VISIBILITY_OPTIONS = [
  { name: 'Visible', value: 'visible' },
  { name: 'Secret', value: 'secret' },
]

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
  shortName: yup.string().required(),
  visibility: yup
    .string()
    .oneOf(VISIBILITY_OPTIONS.map(o => o.value))
    .required(),
  notificationSetting: yup
    .string()
    .oneOf(NOTIFICATION_OPTIONS.map(o => o.value))
    .required(),
});