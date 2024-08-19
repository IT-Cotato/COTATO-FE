import React from 'react';
import styled from 'styled-components';

//
//
//

interface Place {
  place_name: string;
  address_name: string;
  phone: string;
}

interface SearchResultListProps {
  results: Place[];
}

//
//
//

const SearchLocationResultList: React.FC<SearchResultListProps> = ({ results }) => {
  return (
    <Wrapper>
      {results.map((result, index) => (
        <Item key={index}>
          <h3>{result.place_name}</h3>
          <span>{result.address_name}</span>
          <p>{result.phone}</p>
        </Item>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 11rem;
  overflow-y: auto;
`;

const Item = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary90};
  border-radius: 0.5rem;
  h3 {
    width: fit-content !important;
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-top: 0 !important;
    margin-bottom: 0.5rem;
  }
  span {
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding-left: 0.25rem;
  }
  p {
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.xs};
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding-left: 0.25rem;
  }
`;

export default SearchLocationResultList;
