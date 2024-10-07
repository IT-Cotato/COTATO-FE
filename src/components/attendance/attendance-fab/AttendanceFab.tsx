import React from 'react';
import { ReactComponent as GridIcon } from '@/assets/grid_icon.svg';
import { ReactComponent as LayoutIcon } from '@/assets/layout_icon.svg';
import { ReactComponent as ListIcon } from '@/assets/list_icon.svg';
import CotatoFloatingActionButton from '@components/CotatoFloatingActionButton/CotatoFloatingActionButton';
import CotatoFloatingActionButtonItem from '@components/CotatoFloatingActionButton/CotatoFloatingActionButtonItem';
import {
  AttendanceListLayoutType,
  useAttendanceListLayoutStore,
} from '@/zustand-stores/useAttendanceListLayoutStore';

//
//
//

const AttendanceFab = () => {
  const { listLayoutType, setListLayoutType } = useAttendanceListLayoutStore();

  //
  const fabList = {
    grid: {
      name: '그리드',
      icon: <GridIcon width="100%" height="100%" />,
      onClick: () => {
        setListLayoutType(AttendanceListLayoutType.Grid);
      },
    },
    list: {
      name: '리스트',
      icon: <ListIcon width="100%" height="100%" />,
      onClick: () => {
        setListLayoutType(AttendanceListLayoutType.List);
      },
    },
  };

  //
  //
  //
  return (
    <CotatoFloatingActionButton icon={<LayoutIcon width="100%" height="100%" />} name="레이아웃">
      {Object.entries(fabList).map(([key, value]) => (
        <CotatoFloatingActionButtonItem
          key={key}
          selected={key === listLayoutType}
          name={value.name}
          icon={value.icon}
          onClick={value.onClick}
        />
      ))}
    </CotatoFloatingActionButton>
  );
};

export default AttendanceFab;
