import { createStore, useStore } from 'zustand';

//
//
//

export enum AttendanceListLayoutType {
  List = 'list',
  Grid = 'grid',
}

interface AttendanceListLayoutState {
  listLayoutType: AttendanceListLayoutType;
  setListLayoutType: (viewType: AttendanceListLayoutType) => void;
}

//
//
//

const LOCAL_STORAGE_LIST_LAYOUT_TYPE_KEY = 'list_layout_type';

//
//
//

/**
 * attedance list layout store
 */
export const attendanceListLayoutStore = createStore<AttendanceListLayoutState>()((set) => ({
  listLayoutType:
    (localStorage.getItem(LOCAL_STORAGE_LIST_LAYOUT_TYPE_KEY) as AttendanceListLayoutType) ||
    AttendanceListLayoutType.List,

  setListLayoutType: (listLayoutType: AttendanceListLayoutType) => {
    set({ listLayoutType });

    localStorage.setItem(LOCAL_STORAGE_LIST_LAYOUT_TYPE_KEY, listLayoutType);
  },
}));

/**
 *
 */
export const useAttendanceListLayoutStore = () => useStore(attendanceListLayoutStore);
