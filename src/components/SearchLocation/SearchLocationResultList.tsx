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
  paginationRef: React.RefObject<HTMLDivElement>;
}

//
//
//

const SearchLocationResultList: React.FC<SearchResultListProps> = ({ results, paginationRef }) => {
  if (results.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      {results.map((result, index) => (
        <Item key={index} id={index === 0 ? 'top' : ''}>
          <h3>{result.place_name}</h3>
          <span>{result.address_name}</span>
          <p>{result.phone}</p>
        </Item>
      ))}
      <Pagination ref={paginationRef} />
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

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  a {
    padding: 0 0.25rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray90};
    &:not(:last-child) {
      margin-right: 0.725rem;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary20};
      color: ${({ theme }) => theme.colors.primary90};
      border-radius: 0.25rem;
    }
    &.on {
      color: ${({ theme }) => theme.colors.common.real_white};
      background-color: ${({ theme }) => theme.colors.primary90};
      border-radius: 0.25rem;
    }
  }
`;

export default SearchLocationResultList;
