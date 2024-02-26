import { FC, ReactElement, ReactEventHandler, ReactNode } from 'react';
import { Button as RBButton } from 'react-bootstrap';

type Props = {
  children: ReactNode | string;
  onClick: ReactEventHandler;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button: FC<Props> = ({ children, onClick, type = 'button' }): ReactElement => {
  return (
    <RBButton type={type} onClick={onClick}>
      {children}
    </RBButton>
  );
};

export default Button;
