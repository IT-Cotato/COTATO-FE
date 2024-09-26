import React from 'react';
import { styled, useTheme } from 'styled-components';
import president from '@assets/cotato_character_president.svg';
import operation from '@assets/cotato_character_operation.svg';
import education from '@assets/cotato_character_education.svg';
import plan from '@assets/cotato_character_plan.svg';
import promotion from '@assets/cotato_character_promotion.svg';
import diagramLine from '@assets/structure_diagram_line.svg';

//
//
//

const AboutStructureDiagram = () => {
  const theme = useTheme();

  const teamLeaderList = [
    {
      name: '운영지원팀',
      color: theme.colors.primary90,
      icon: operation,
    },
    {
      name: '교육팀',
      color: theme.colors.sub1[20],
      icon: education,
    },
    {
      name: '기획팀',
      color: theme.colors.sub3[20],
      icon: plan,
    },
    {
      name: '홍보팀',
      color: theme.colors.sub2[20],
      icon: promotion,
    },
  ];

  return (
    <Wrapper>
      <CharacterWrapper>
        <CharacterIcon src={president} alt="cotato_character_president" $width="9rem" />
        <CharacterName $background={theme.colors.secondary60}>회장단</CharacterName>
      </CharacterWrapper>
      <DiagramLine src={diagramLine} alt="structrue_diagram_line" />
      <TeamLeaderContainer>
        {teamLeaderList.map((teamLeader, index) => (
          <CharacterWrapper key={index}>
            <CharacterIcon src={teamLeader.icon} alt={`cotato_character_${teamLeader.name}`} />
            <CharacterName $background={teamLeader.color}>{teamLeader.name}</CharacterName>
          </CharacterWrapper>
        ))}
      </TeamLeaderContainer>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CharacterIcon = styled.img<{ $width?: string }>`
  width: ${({ $width }) => $width || '8rem'};
`;

const CharacterName = styled.div<{ $background: string }>`
  display: flex;
  padding: 0.5rem;
  width: 12rem;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  background: ${({ $background }) => $background};
  color: ${({ theme }) => theme.colors.common.white};
  text-align: center;
  font-family: Ycomputer;
  font-size: 1.875rem;
  font-weight: 400;
`;

const DiagramLine = styled.img`
  margin-top: 2rem;
  width: calc(100% - 12rem);
`;

const TeamLeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default AboutStructureDiagram;
