import { ReactNode } from 'react';

// Define the interface for the fields
export interface GenericFormField {
  name: string; // Name of the field (used for form identification)
  label: string; // Label to display for the field
  input: ReactNode; // The input element to render (e.g., <Input />, <Checkbox />, etc.)
}
