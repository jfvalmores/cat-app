import { TToast, TToastContext } from '@/types';
import { createContext, FC, ReactElement, ReactNode, useContext, useState } from 'react';
import Toast from '@/components/Toast';

const ContextDefaults: TToastContext = {
  showToast: () => null,
};

const ToastContext = createContext<TToastContext>(ContextDefaults);

export const useToastContext = () => useContext(ToastContext);

type Props = {
  children: ReactNode;
};

export const ToastProvider: FC<Props> = ({ children }): ReactElement => {
  const [toast, showToast] = useState<TToast>({ message: '', type: 'error' });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast detail={toast} />
    </ToastContext.Provider>
  );
};
