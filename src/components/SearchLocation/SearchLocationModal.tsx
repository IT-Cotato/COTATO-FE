import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '@assets/search.svg';
import { ReactComponent as DeleteIcon } from '@assets/delete.svg';
import PrevButton from '@assets/pixel_arrow_left.svg';
import KakaoMap from '@/components/SearchLocation/SearchLocationKakaoMap';
import SearchResultList from '@/components/SearchLocation/SearchLocationResultList';
import { Box } from '@mui/system';
import { media } from '@theme/media';
import { Place } from '@/typing/session';

//
//
//

// interface Place {
//   place_name: string;
//   address_name: string;
//   phone: string;
//   x: string;
//   y: string;
// }

interface SearchLocationModalProps {
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationName?: React.Dispatch<React.SetStateAction<string>>;
  onPlaceChange?: (place: Place) => void;
}

//
//
//

const SearchLocationModal: React.FC<SearchLocationModalProps> = ({
  setIsSearchModalOpen,
  setLocationName,
  onPlaceChange,
}) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Place[]>([]);

  const paginationRef = useRef<HTMLDivElement>(null);

  /**
   *
   */
  const handleSearch = () => {
    // 검색어가 변경되면 KakaoMap 컴포넌트에서 지도가 업데이트 됨
    // setResults([]); // 기존 검색 결과를 초기화
    console.log(results);
  };

  if (!open) {
    return null;
  }

  return (
    <Background>
      <Modal>
        <Header>
          <img src={PrevButton} onClick={() => setIsSearchModalOpen(false)} />
        </Header>
        <h3>세션 장소 검색</h3>
        <SearchBar>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <SearchIcon onClick={handleSearch} />
            <DeleteIcon />
          </Box>
        </SearchBar>
        <KakaoMap
          searchKeyword={keyword}
          onSearchResults={setResults}
          paginationRef={paginationRef}
        />
        <SearchResultList
          results={results}
          paginationRef={paginationRef}
          keyword={keyword}
          setIsSearchModalOpen={setIsSearchModalOpen}
          setLocationName={setLocationName}
          onPlaceChange={onPlaceChange}
        />
      </Modal>
    </Background>
  );
};

//
//
//

const Background = styled.div`
  background: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 210;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 34rem;
  height: 38rem;
  border-radius: 1.725rem;
  background-color: ${({ theme }) => theme.colors.common.white_const};
  padding: 2.5rem 2.25rem;
  h3 {
    width: 100%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin: 1rem 0 1.5rem 0;
  }

  ${media.mobile`
    width: 22rem;
    height: 34rem;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-bottom: 1.6rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0;
    left: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SearchBar = styled.div`
  width: 16rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.common.black_const};
  margin-bottom: 1.5rem;
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.fontSize.sm};
    background-color: ${({ theme }) => theme.colors.common.white_const};
  }
  svg {
    width: 1.25rem;
    height: 1.25rem;
    &:first-child {
      margin-right: 0.5rem;
    }
  }
`;

export default SearchLocationModal;
