import React from 'react';
import CotatoFloatingActionButton from './CotatoFloatingActionButton/CotatoFloatingActionButton';
import CotatoFloatingActionButtonItem from './CotatoFloatingActionButton/CotatoFloatingActionButtonItem';
import { ReactComponent as AttendanceCheckIcon } from '@assets/attendance_check.svg';
import { ReactComponent as RemoteIcon } from '@assets/remote.svg';
import { ReactComponent as LateIcon } from '@assets/late.svg';
import { ReactComponent as AbsenceIcon } from '@assets/absence.svg';

//
//
//

const FAB_KEY_LIST = {
  absence: '결석 횟수',
  late: '지각 횟수',
  remote: '비대면 횟수',
  face: '대면 횟수',
} as const;

const FAB_ICON_LIST = {
  face: <AttendanceCheckIcon width="100%" height="100%" />,
  remote: <RemoteIcon width="100%" height="100%" />,
  late: <LateIcon width="100%" height="100%" />,
  absence: <AbsenceIcon width="100%" height="100%" />,
} as const;

//
//
//

const CotatoAttendanceFab = () => {
  const [selected, setSelected] = React.useState<(typeof FAB_KEY_LIST)[keyof typeof FAB_KEY_LIST]>(
    FAB_KEY_LIST.face,
  );

  //
  //
  //
  return (
    <CotatoFloatingActionButton name="출석부">
      {Object.entries(FAB_KEY_LIST).map(([key, value]) => (
        <CotatoFloatingActionButtonItem
          key={key}
          name={value}
          icon={FAB_ICON_LIST[key as keyof typeof FAB_ICON_LIST]}
          selected={selected === value}
          onClick={() => {
            setSelected(value);
          }}
        />
      ))}
    </CotatoFloatingActionButton>
  );
};

export default CotatoAttendanceFab;
