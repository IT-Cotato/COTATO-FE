import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import SearchLocationModal from '@components/SearchLocation/SearchLocationModal';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface AttendanceModalLocationTabProps {
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  locationName: string;
}

//
//
//

const AttendanceModalLocationTab: React.FC<AttendanceModalLocationTabProps> = ({
  isSearchModalOpen,
  setIsSearchModalOpen,
  setLocationName,
  locationName,
}) => {
  /**
   *
   */
  const renderSearchModal = () => {
    if (isSearchModalOpen) {
      return (
        <SearchLocationModal
          setIsSearchModalOpen={setIsSearchModalOpen}
          setLocationName={setLocationName}
        />
      );
    }
  };

  //
  //
  //
  useEffect(() => {
    console.log(locationName);
  }, [locationName]);

  return (
    <div>
      <InputBox onClick={() => setIsSearchModalOpen(true)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <CotatoIcon icon="location-pin" size="1.5rem" color={(theme) => theme.colors.primary90} />
          <p>주소</p>
        </Box>
        <CotatoIcon icon="search" color={(theme) => theme.colors.primary90} />
      </InputBox>
      {renderSearchModal()}
    </div>
  );
};

//
//
//

const InputBox = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary90};
  background-color: ${({ theme }) => theme.colors.const.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-left: 1rem;
  }
`;

export default AttendanceModalLocationTab;
