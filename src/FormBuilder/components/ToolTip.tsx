import { IconButton, Tooltip, IconButtonProps } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

interface ToolTipProps {
  message: string;
  iconButtonProps?: IconButtonProps;
}

export function FormToolTip({ message, iconButtonProps, ...tooltipProps }: ToolTipProps) {
  return (
    <Tooltip title={message} {...tooltipProps}>
      <IconButton color="secondary" size="small" aria-label={message} {...iconButtonProps}>
        <InfoIcon aria-label="info-icon" />
      </IconButton>
    </Tooltip>
  );
}
