import { FC, ReactElement } from 'react';
import ReactLoading from 'react-loading';

type Props = {
  color: string;
  height: number;
  type?: 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes';
  width: number;
};

const Loading: FC<Props> = ({ color = '#fff', height, type = 'spinningBubbles', width }): ReactElement => (
  <ReactLoading color={color} height={height} type={type} width={width} />
);

export default Loading;
