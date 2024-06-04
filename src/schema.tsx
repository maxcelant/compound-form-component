import * as yup from 'yup';

const NOTIFICATION_OPTIONS = [
  { name: 'Disabled', value: 'notifications_disabled' },
  { name: 'Enabled', value: 'notifications_enabled' },
];

// export const GitHubTeamSchema = yup.object({
//   teamName: yup
//     .string()
//     .required()
//     .matches(
//       /^(?![-.])[a-zA-Z0-9-. ]{1,255}(?<![.])$/g,
//       "Invalid team name. Please adhere to GitHub's naming conventions.",
//     ),
//   description: yup.string(),
//   visibility: yup
//     .string()
//     .oneOf(VISIBILITY_OPTIONS.map(o => o.id))
//     .required(),
//   notificationSetting: yup
//     .string()
//     .oneOf(NOTIFICATION_OPTIONS.map(o => o.id))
//     .required(),
// });

export const GitHubTeamSchema = yup.object({
  teamName: yup.string().required(),
  description: yup.string().required(),
  username: yup.string().required(),
  authority: yup.string().required(),
  shortName: yup.string().required(),
  pci: yup.string().required(),
  notificationSetting: yup
    .string()
    .oneOf(NOTIFICATION_OPTIONS.map(o => o.value))
    .required(),
})