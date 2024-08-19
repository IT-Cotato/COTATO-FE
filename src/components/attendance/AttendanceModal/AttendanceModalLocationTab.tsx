import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as LocationIcon } from '@assets/attendance_location_pin_stroke.svg';
import { ReactComponent as SearchIcon } from '@assets/search.svg';
import { Box } from '@mui/material';
import { render } from '@testing-library/react';
import SearchLocationModal from '@components/SearchLocation/SearchLocationModal';

//
//
//

interface AttendanceModalLocationTabProps {
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const AttendanceModalLocationTab: React.FC<AttendanceModalLocationTabProps> = ({
  isSearchModalOpen,
  setIsSearchModalOpen,
}) => {
  const theme = useTheme();

  /**
   *
   */
  const renderSearchModal = () => {
    if (isSearchModalOpen) {
      return <SearchLocationModal setIsSearchModalOpen={setIsSearchModalOpen} />;
    }
  };

  return (
    <div>
      <InputBox onClick={() => setIsSearchModalOpen(true)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <LocationIcon />
          <p>주소</p>
        </Box>
        <SearchIcon fill={theme.colors.primary90} />
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
  background-color: ${({ theme }) => theme.colors.common.white_const};
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
