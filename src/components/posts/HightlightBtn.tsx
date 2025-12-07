import React from 'react';
import { SunIcon } from '../icons/SunIcon';

interface HightlightBtnProps {
  onClick: () => void;
  paintIcon?: boolean;
}

const HightlightBtn = ({ onClick, paintIcon }: HightlightBtnProps) => {

  return React.createElement(
    'button',
    { onClick },
    React.createElement(SunIcon, { color: paintIcon ? 'lightgreen' : 'white' })
  );
}

export default React.memo(HightlightBtn)

