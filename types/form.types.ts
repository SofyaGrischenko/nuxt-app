export interface Details {
  id: string;
  created_at: string;
  name: string;
  category_name?: string;
}

type InputProps = boolean | string | undefined | null | Details[];

export interface Input {
  label: string;
  field: string;
  component: string;
  value?: string;
  props?: { [key: string]: InputProps };
}
