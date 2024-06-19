import { IconButton, Tooltip } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import { ToolTipProps } from "../types";

/**
 * Creates a ToolTip subcomponent
 * @param message message to display in the tooltip
 * @param style optional style object
 * @param options optional options object
*/
export function FormToolTip({ message, style, options }: ToolTipProps) {
  return (
    <Tooltip title={message} style={style}>
      <IconButton color="primary" size="small" aria-label={`form-tooltip-${message}`} {...options}>
        <InfoIcon aria-label="info-icon" />
      </IconButton>
    </Tooltip>
  );
}
