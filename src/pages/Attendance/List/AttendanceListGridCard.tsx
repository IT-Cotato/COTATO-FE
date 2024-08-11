import React from 'react';
import { styled } from 'styled-components';

//
//
//

interface AttendanceListGridCardProps {
  index: number;
}

//
//
//

const AttendanceListGridCard = ({ index }: AttendanceListGridCardProps) => {
  return <Container>{index}</Container>;
};

//
//
//

const Container = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 1.5rem;
  display: grid;
  place-items: center;

  background: pink;
  color: white;
  font-size: 5rem;
`;

export default AttendanceListGridCard;
