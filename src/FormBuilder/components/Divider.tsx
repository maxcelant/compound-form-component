
import React from "react";
import { Divider } from "@material-ui/core";

const dividerDefaults = {
  style: {
    margin: '20px 0',
    backgroundColor: '#DDDDDD',
    height: '2px',
  } as React.CSSProperties,
};
/**
 * Creates a horizontal divider for your form
 * @param style optional style object
 */
export function FormDivider({ style }: { style?: React.CSSProperties }) {
  return (
    <div>
      <Divider 
        aria-label='form-divider'
        style={{...dividerDefaults.style, ...style}}
      />
    </div>
  );
}

