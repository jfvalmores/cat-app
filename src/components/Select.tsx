import { SelectItem } from '@/types';
import { ChangeEventHandler, FC, ReactElement } from 'react';
import { FloatingLabel, FormSelect } from 'react-bootstrap';

type Props = {
  isLoading?: boolean;
  items: SelectItem[];
  label: string;
  onChange: ChangeEventHandler;
  value: string;
};

const Select: FC<Props> = ({ isLoading = false, items, label, onChange, value }): ReactElement => {
  return (
    <FloatingLabel controlId={`${label}_select`} label={label}>
      <FormSelect autoFocus value={value} onChange={onChange} disabled={isLoading}>
        <option value="">Select {label}</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default Select;
