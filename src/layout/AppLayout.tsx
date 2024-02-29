import { FC, ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppLayout: FC<Props> = ({ children }): ReactElement => {
  return <>{children}</>;
};

export default AppLayout;
