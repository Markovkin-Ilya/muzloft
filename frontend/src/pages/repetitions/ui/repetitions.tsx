import { FC } from 'react';

import { RepetitionsUIProps } from './type';
import { Repetition } from '@components/repetition/repetition';

export const RepetitionsUI: FC<RepetitionsUIProps> = ({ repetitions }) => (
  <div>
    {repetitions.map((repetition) => (
      <Repetition key={repetition._id} repetition={repetition} />
    ))}
  </div>
);