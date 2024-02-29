import { FC, ReactElement, ReactNode } from 'react';
import { Card as RBCard } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  className?: string;
  header?: ReactNode | string;
  children: ReactNode;
  image: string;
};

const CardImage = styled(RBCard.Img)`
  flex: 1 1 auto;
  object-fit: cover;
`;

const CardBody = styled(RBCard.Body)`
  flex: 0;
`;

export const Card: FC<Props> = ({ className, header, image, children }): ReactElement => {
  return (
    <RBCard className={className}>
      {header && <RBCard.Header>{header}</RBCard.Header>}
      <CardImage variant="top" src={image} />
      <CardBody>{children}</CardBody>
    </RBCard>
  );
};
