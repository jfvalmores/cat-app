import { SelectItem } from '@/types';
import { ChangeEventHandler, FC, ReactElement } from 'react';
import { FloatingLabel, FormSelect } from 'react-bootstrap';

type Props = {
  items: SelectItem[];
  label: string;
  onChange: ChangeEventHandler;
};

const Select: FC<Props> = ({ items, label, onChange }): ReactElement => {
  return (
    <FloatingLabel controlId={`${label}_select`} label={label}>
      <FormSelect onChange={onChange}>
        <option>Select {label}</option>
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
