import React, { useState } from 'react';
import { ReactComponent as Info } from '@/pages/MyPage/tempAsssets/info_circle.svg';
import { IconButton, Tooltip } from '@mui/material';

//
//
//

const CustomTooltip = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '50rem',
      }}
    >
      <div>
        <h3>COTATO 페이지에는 다음과 같은 관리자 권한이 있습니다.</h3>
        <ul>
          <li>출석: 출석 정보 수정</li>
          <li>세션 기록: 정보 업로드 및 수정</li>
          <li>마이페이지: 부원 정보 관리</li>
        </ul>
      </div>
      <hr style={{ border: '1px solid black', width: '100%' }} />
      <div>
        <span>각 역할(Role)에게 부여되는 권한은 다음과 같습니다:</span>
        <ul>
          <li>
            개발팀 : 모든 기능에 대한 전체 권한을 보유하며, 활동 기수가 아니더라도 출석 및 문제
            풀이가 가능합니다.
          </li>
          <li>관리자 : 모든 기능에 대한 전체 권한을 보유합니다.</li>
          <li>부관리자 : 출석 관리 권한이 허용되며, 출석 관리 외의 기능은 제한됩니다.</li>
          <li>멤버 (일반 사용자) : 모든 관리자 기능이 제한됩니다.</li>
          <li>OM : 활동 기수가 아니며, 출석 및 실시간 문제 풀이가 불가합니다.</li>
        </ul>
      </div>
    </div>
  );
};

//
//
//

export default function InfoTooltip() {
  const [open, setOpen] = useState(false);

  //
  //
  //

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={<CustomTooltip />}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'white',
            color: 'black',
            borderRadius: '0.625rem',
            p: '2rem 1.5rem',
            boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.25)',
            maxWidth: 'none',
            width: 'auto',
          },
        },
      }}
    >
      <IconButton onClick={() => setOpen(!open)} className="focus:outline-none">
        <Info />
      </IconButton>
    </Tooltip>
  );
}
