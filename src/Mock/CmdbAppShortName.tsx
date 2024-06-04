import React from 'react';
import { useAsync } from 'react-use';
import { CircularProgress, FormHelperText, TextField } from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import { getOwnSupportedApps, getAllApplicationsSimpleV2 } from './MockSquad360';

export type OnChangeValue = {
  shortName: string;
  archerId: string;
  costCenter: string;
  cmdbAppFullName: string;
  productName: string;
};

interface CmdbAppShortNameProps {
  onChange(value: OnChangeValue): void;
  onBlur(): void;
  disabled?: boolean | undefined;
  getOwnApps?: boolean | undefined;
  label?: string | undefined;
  width?: string | number | undefined;
  required?: boolean;
  initialValue?: OnChangeValue;
}

type SimpleApp = {
  name: string;
  shortName: string;
  srcRecId: string;
  costCenter: string;
  product: {
    id: number;
    name: string;
    costCenter: string;
  };
};

export const CmdbAppShortName: React.FC<CmdbAppShortNameProps> = ({
  onChange,
  onBlur,
  disabled = false,
  getOwnApps = false,
  label = 'Short Name',
  required = true,
  initialValue,
}) => {
  const { loading, value: applications, error } = useAsync(async () => {
    if (getOwnApps) {
      return await getOwnSupportedApps();
    } else {
      return await getAllApplicationsSimpleV2();
    }
  }, [getOwnApps]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error loading applications</Alert>;
  }

  return (
    <div>
      <Autocomplete
        fullWidth
        id="cmdbAppShortName"
        data-testid="cmdbAppShortName"
        disableClearable
        autoSelect
        defaultValue={undefined}
        options={applications || []}
        getOptionLabel={(option: SimpleApp) => option.shortName}
        getOptionSelected={(option: SimpleApp, value: SimpleApp) =>
          option.shortName === value.shortName
        }
        onChange={(_, application: SimpleApp | null) => {
          if (application) {
            const out: OnChangeValue = {
              shortName: application.shortName,
              archerId: application.srcRecId,
              costCenter: application.costCenter.replace('-', '/'),
              cmdbAppFullName: application.name,
              productName: application.product.name,
            };
            onChange(out);
          }
        }}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            label={label}
            variant="outlined"
            disabled={disabled}
          />
        )}
      />
      {required && (
        <FormHelperText error>{/* Error message if needed */}</FormHelperText>
      )}
    </div>
  );
};
