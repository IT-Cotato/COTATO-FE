import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ClockIcon } from '@assets/attendance_clock.svg';
import { ReactComponent as LocationPinIcon } from '@assets/attendance_location_pin.svg';
import PrevButton from '@assets/pixel_arrow_left.svg';
import { Tabs, Tab, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import AttendanceTimeTab from '@components/attendance/AttendanceModal/AttendanceModalTimeTab';
import AttendanceLocationTab from '@components/attendance/AttendanceModal/AttendanceModalLocationTab';

//
//
//

type LocationType = {
  lat: number;
  lng: number;
};

//
//
//

const AttendanceModal = () => {
  const [tabValue, setTabValue] = useState('time');
  const [location, setLocation] = useState<LocationType>({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  /**
   *
   */
  const handleTabChange = (e: React.SyntheticEvent, value: any) => {
    setTabValue(value);
  };

  /**
   *
   */
  const renderTimeTab = () => {
    return (
      <StyledTabPanel value="time">
        <AttendanceTimeTab />
      </StyledTabPanel>
    );
  };

  /**
   *
   */
  const renderLocationTab = () => {
    return (
      <StyledTabPanel value="location">
        <AttendanceLocationTab
          isSearchModalOpen={isSearchModalOpen}
          setIsSearchModalOpen={setIsSearchModalOpen}
          setLocationName={setLocationName}
          locationName={locationName}
        />
      </StyledTabPanel>
    );
  };

  const renderTabs = () => {
    return (
      <TabContext value={tabValue}>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Tabs
            variant="fullWidth"
            indicatorColor="primary"
            onChange={handleTabChange}
            sx={{ width: '100%' }}
          >
            <StyledTab
              value="time"
              icon={<ClockIcon />}
              iconPosition="start"
              label="시간"
              $isSelected={tabValue === 'time'}
            />
            <StyledTab
              value="location"
              icon={<LocationPinIcon />}
              iconPosition="start"
              label="위치 등록"
              $isSelected={tabValue === 'location'}
            />
          </Tabs>
        </Box>
        {renderTimeTab()}
        {renderLocationTab()}
      </TabContext>
    );
  };

  return (
    <Background>
      <Modal>
        <Header>
          <img src={PrevButton} />
          <h3>9기 4주차 세션</h3>
        </Header>
        {renderTabs()}
        <Submit>
          <button>확인</button>
        </Submit>
      </Modal>
    </Background>
  );
};

//
//
//

const Background = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34rem;
  height: 38rem;
  border-radius: 1.725rem;
  background-color: ${({ theme }) => theme.colors.common.white_const};
  padding: 2.5rem 2.25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-bottom: 1.6rem;
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
  h3 {
    color: ${({ theme }) => theme.colors.common.black_const};
    font-size: 1.5rem;
    margin: 0;
  }
`;

const StyledTab = styled(Tab)<{ $isSelected: boolean }>`
  height: 3.5rem;
  border-bottom: ${({ $isSelected, theme }) =>
    $isSelected ? `3px solid ${theme.colors.primary90}` : 'none'} !important;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary90 : theme.colors.gray50} !important;
  padding: 0 !important;
  svg {
    fill: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary90 : theme.colors.gray50};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  flex: 1;
  &.MuiTabPanel-root {
    padding: 2.5rem 0 1rem 0;
  }
`;

const Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  button {
    width: 4rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary100_1};
    background-color: ${({ theme }) => theme.colors.primary50};
    color: ${({ theme }) => theme.colors.common.black_const};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export default AttendanceModal;
