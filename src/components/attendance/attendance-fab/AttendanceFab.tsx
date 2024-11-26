import React from 'react';
import { ReactComponent as GridIcon } from '@/assets/grid_icon.svg';
import CotatoFloatingActionButton from '@components/CotatoFloatingActionButton/CotatoFloatingActionButton';
import CotatoFloatingActionButtonItem from '@components/CotatoFloatingActionButton/CotatoFloatingActionButtonItem';
import {
  AttendanceListLayoutType,
  useAttendanceListLayoutStore,
} from '@/zustand-stores/useAttendanceListLayoutStore';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface FabList {
  name: string;
  svgIcon?: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
}

//
//
//

const AttendanceFab = () => {
  const { listLayoutType, setListLayoutType } = useAttendanceListLayoutStore();

  //
  const fabList = {
    grid: {
      name: '그리드',
      svgIcon: <GridIcon width="100%" height="100%" />,
      icon: <GridIcon width="100%" height="100%" />,
      onClick: () => {
        setListLayoutType(AttendanceListLayoutType.Grid);
      },
    } as FabList,
    list: {
      name: '리스트',
      icon: (
        <CotatoIcon
          icon="bars-solid"
          style={{ transform: 'rotate(90deg)' }}
          color={(theme) => theme.colors.common.white_const}
          size="100%"
        />
      ),
      onClick: () => {
        setListLayoutType(AttendanceListLayoutType.List);
      },
    } as FabList,
  };

  //
  //
  //
  return (
    <CotatoFloatingActionButton
      icon={
        <CotatoIcon
          icon="expand-solid"
          size="100%"
          color={(theme) => theme.colors.common.white_const}
        />
      }
      name="레이아웃"
    >
      {Object.entries(fabList).map(([key, value]) => (
        <CotatoFloatingActionButtonItem
          key={key}
          selected={key === listLayoutType}
          name={value.name}
          svgIcon={value.svgIcon ?? undefined}
          icon={value.icon}
          onClick={value.onClick}
        />
      ))}
    </CotatoFloatingActionButton>
  );
};

export default AttendanceFab;
