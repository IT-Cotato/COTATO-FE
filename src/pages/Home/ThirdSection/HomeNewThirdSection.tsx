import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as CotatoCharacterFront } from '@assets/cotato_character_front.svg';
import { ReactComponent as CotatoCharacterBack } from '@assets/cotato_character_back.svg';
import { ReactComponent as CotatoCharacterPM } from '@assets/cotato_character_pm.svg';
import { ReactComponent as CotatoCharacterDesign } from '@assets/cotato_character_design.svg';
import { device } from '@theme/media';
import CotatoTooltip from '@components/CotatoTooltip';

//
//
//

interface CotatoCharacterProps {
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: string;
  height?: string;
  tooltip?: string;
}

//
//
//

type COTATO_CHARCTER_KEYS = 'FRONT' | 'BACK' | 'PM' | 'DESIGN';

const COTATO_CHARCTER_SVG_LIST: Array<Partial<Record<COTATO_CHARCTER_KEYS, CotatoCharacterProps>>> =
  [
    {
      FRONT: {
        component: CotatoCharacterFront,
        width: '11rem',
        height: '10rem',
        tooltip: '#비주얼담당 #징검다리',
      },
    },
    {
      BACK: {
        component: CotatoCharacterBack,
        width: '11rem',
        height: '10rem',
        tooltip: '#든든하게 #JAVA줄게',
      },
    },
    {
      PM: {
        component: CotatoCharacterPM,
        width: '9rem',
        height: '10rem',
        tooltip: '#기초부터 #확실하게',
      },
    },
    {
      DESIGN: {
        component: CotatoCharacterDesign,
        width: '12rem',
        height: '10rem',
        tooltip: '#디테일은 #자신있어',
      },
    },
  ];

//
//
//

const HomeNewThirdSection = () => {
  const theme = useTheme();
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const tooltipRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [tooltipOpenMap, setTooltipOpenMap] = React.useState<Map<string, boolean>>(
    new Map([
      ['FRONT', false],
      ['BACK', false],
      ['PM', false],
      ['DESIGN', false],
    ]),
  );

  /**
   *
   */
  const renderTitle = () => {
    return (
      <Typography variant={isMobileOrSmaller ? 'h5' : 'h3'} fontFamily="YComputer">
        COTATO CLUB MEMBERS
      </Typography>
    );
  };

  /**
   *
   */
  const renderDescription = () => {
    return (
      <Typography variant="body1" fontFamily="YComputer" textAlign="center">
        코테이토의 팀이 모이면, <br /> 도전을 시도할 수 있는 기술과 지식이 성장해요.
      </Typography>
    );
  };

  /**
   *
   */
  const renderCotatoCharacters = () => {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        gap={isMobileOrSmaller ? '0rem' : '3rem'}
        flexWrap="wrap"
      >
        {COTATO_CHARCTER_SVG_LIST.map((svg) => {
          const key = Object.keys(svg)[0] as COTATO_CHARCTER_KEYS;
          const Character = svg[key]?.component as React.FunctionComponent<
            React.SVGProps<SVGSVGElement>
          >;
          const width = svg[key]?.width as string;
          const height = svg[key]?.height as string;
          const tooltip = svg[key]?.tooltip as string;

          return (
            <Stack
              key={key}
              className={key}
              ref={(ref) => tooltipRefs.current.push(ref)}
              alignItems="center"
              sx={{
                marginTop: '3rem',
              }}
            >
              <CotatoTooltip
                arrow
                open={tooltipOpenMap.get(key)}
                title={tooltip}
                placement="top"
                fontSize={isTabletOrSmaller ? '0.75rem' : '1rem'}
                PopperProps={{
                  disablePortal: true,
                }}
              >
                <Box width={isMobileOrSmaller ? '9rem' : '11.5rem'} height="11.5rem">
                  <Character
                    width={
                      isMobileOrSmaller
                        ? `calc(${width} * 0.7)`
                        : isTabletOrSmaller
                        ? `calc(${width} * 0.9)`
                        : width
                    }
                    height={height}
                  />
                </Box>
              </CotatoTooltip>
              <Box width="10.5rem">
                <Typography
                  textAlign="center"
                  color={theme.colors.common.black}
                  variant="h6"
                  fontFamily="YComputer"
                >
                  TEAM {key}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    );
  };

  //
  // Intersection Observer for Tooltip
  //
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.textContent?.split(' ')[1] as COTATO_CHARCTER_KEYS;
          if (entry.isIntersecting) {
            // setTimeout for tooltip position
            setTimeout(() => {
              setTooltipOpenMap(new Map(tooltipOpenMap.set(key, true)));
            }, 200);
          }
        });
      },
      {
        threshold: 0,
      },
    );

    tooltipRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      tooltipRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  //
  //
  //
  return (
    <Wrapper>
      <StyledStack>
        {renderTitle()}
        {renderDescription()}
      </StyledStack>
      <Stack>{renderCotatoCharacters()}</Stack>
    </Wrapper>
  );
};
//
//
//

const StyledStack = styled(Stack)`
  gap: 1rem;
  color: ${({ theme }) => theme.colors.common.black};
  align-items: center;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 7.5rem 0;
  gap: 3rem;
  font-family: 'YComputer';
`;

export default HomeNewThirdSection;
