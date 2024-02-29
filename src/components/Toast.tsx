import { ToastTypes, TToast } from '@/types';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, Toast as RBToast } from 'react-bootstrap';
import { TOAST_TIMEOUT } from '@/constants';

const theme = {
  error: {
    color: 'var(--bs-danger-text-emphasis)',
    background: 'var(--bs-danger-bg-subtle)',
    border: 'var(--bs-danger-border-subtle)',
  },
  info: {
    color: 'var(--bs-info-text-emphasis)',
    background: 'var(--bs-info-bg-subtle)',
    border: 'var(--bs-info-border-subtle)',
  },
  success: {
    color: 'var(--bs-success-text-emphasis)',
    background: 'var(--bs-success-bg-subtle)',
    border: 'var(--bs-success-border-subtle)',
  },
  warning: {
    color: 'var(--bs-warning-text-emphasis)',
    background: 'var(--bs-warning-bg-subtle)',
    border: 'var(--bs-warning-border-subtle)',
  },
};

const ToastWrapper = styled(ToastContainer)`
  position: fixed;
  right: 1rem;
  top: 1rem;
`;

const StyledToast = styled(RBToast)<{ $type: ToastTypes }>`
  border: 1px ${(props) => theme[props.$type].border};

  & > .toast-header {
    background-color: ${(props) => theme[props.$type].background};
    border-bottom: 1px solid ${(props) => theme[props.$type].border};
    color: ${(props) => theme[props.$type].color};

    & > .btn-close {
      color: ${(props) => theme[props.$type].color};
    }
  }

  & > .toast-body {
    background-color: ${(props) => theme[props.$type].background};
    color: ${(props) => theme[props.$type].color};
  }
`;

type Props = {
  detail: TToast;
};

let timeout: NodeJS.Timeout;

const Toast: FC<Props> = ({ detail }): ReactElement => {
  const [show, setShow] = useState(false);
  const header = useMemo(() => `${detail.type.charAt(0).toUpperCase()}${detail.type.slice(1)}`, [detail.type]);

  useEffect(() => {
    if (detail.message) {
      setShow(true);
      timeout = setTimeout(() => {
        setShow(false);
      }, TOAST_TIMEOUT);
    }

    return () => clearTimeout(timeout);
  }, [detail.message]);

  const toggleShow = () => setShow(!show);

  return (
    <ToastWrapper style={{ zIndex: 1000 }}>
      <StyledToast $type={detail.type} show={show} onClose={toggleShow}>
        <RBToast.Header closeButton>
          <strong className="me-auto">{header}</strong>
        </RBToast.Header>
        <RBToast.Body>{detail.message}</RBToast.Body>
      </StyledToast>
    </ToastWrapper>
  );
};

export default Toast;
