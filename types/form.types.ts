export interface Input {
  label: string;
  field: string;
  component: string;
  props?: Record<string, InputProps>;
}

type InputProps = boolean | string;
