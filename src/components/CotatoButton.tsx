import React from 'react';

//
//
//

interface CotatoButtonProps {
  width: string;
  height: string;
  color: string;
  text: string;
  handleClick?: React.FormEventHandler | React.MouseEventHandler<HTMLButtonElement>;
}

const CotatoButton: React.FC<CotatoButtonProps> = ({ width, height, text, color, handleClick }) => {
  return <button onClick={handleClick}>버튼</button>;
};

export default CotatoButton;
