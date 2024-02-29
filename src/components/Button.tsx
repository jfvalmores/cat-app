import { FC, ReactElement, ReactEventHandler, ReactNode } from 'react';
import { Button as RBButton } from 'react-bootstrap';
import styled from 'styled-components';
import Loading from './Loading';

type Props = {
  children: ReactNode | string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: ReactEventHandler;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'link';
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button: FC<Props> = ({
  children,
  className,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  variant = 'primary',
}): ReactElement => {
  return (
    <RBButton className={className} disabled={disabled || isLoading} onClick={onClick} type={type} variant={variant}>
      {isLoading ? (
        <LoadingContainer>
          <Loading color="#fff" height={24} width={20} />
        </LoadingContainer>
      ) : (
        children
      )}
    </RBButton>
  );
};

export default Button;
