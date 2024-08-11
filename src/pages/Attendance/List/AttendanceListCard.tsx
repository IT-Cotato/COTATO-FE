import React from 'react';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';
import { styled } from 'styled-components';

//
//
//

interface AttendanceListCardProps {
  session?: CotatoSessionListResponse;
  index: number;
}

//
//
//

const AttendanceListCard = ({ index }: AttendanceListCardProps) => {
  return <Container>{index}</Container>;
};

//
//
//

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18rem;
  height: 24rem;
  background: pink;
  border-radius: 2.25rem;

  color: white;
  font-size: 10rem;
`;

export default AttendanceListCard;
