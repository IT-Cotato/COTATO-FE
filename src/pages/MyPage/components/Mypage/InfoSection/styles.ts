import styled from 'styled-components';

export const SectionContainer = styled.div`
  display: flex;
  padding: 2.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.25rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary100_1};
  background-color: ${({ theme }) => theme.colors.common.real_white};
`;

export const InfoSectionTitle = styled.div`
  font-family: Pretendard;
  font-size: 1.75rem;
  font-weight: 600;
`;

export const InfoSectionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  align-self: stretch;
`;

export const SectionItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primary90};
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.gray60};
  font-family: Pretendard;
`;
