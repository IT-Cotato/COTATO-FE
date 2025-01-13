import { Box, Grid2, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as CotatoCharacterFront } from '@assets/cotato_character_front.svg';
import { ReactComponent as CotatoCharacterBack } from '@assets/cotato_character_back.svg';
import { ReactComponent as CotatoCharacterPM } from '@assets/cotato_character_pm.svg';
import { ReactComponent as CotatoCharacterDesign } from '@assets/cotato_character_design.svg';
import { device, media } from '@theme/media';
import CotatoTooltip from '@components/CotatoTooltip';

import HomeFooter from '@components/HomeFooter';
import { useBreakpoints } from '@/hooks/useBreakpoints';

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
        width: '7.5rem',
        tooltip: '#비주얼담당 #징검다리',
      },
    },
    {
      BACK: {
        component: CotatoCharacterBack,
        width: '7.5rem',
        tooltip: '#든든하게 #JAVA줄게',
      },
    },
    {
      PM: {
        component: CotatoCharacterPM,
        width: '7.5rem',
        tooltip: '#기초부터 #확실하게',
      },
    },
    {
      DESIGN: {
        component: CotatoCharacterDesign,
        width: '8rem',
        tooltip: '#디테일은 #자신있어',
      },
    },
  ];

//
//
//

const HomeNewThirdSection = () => {
  const theme = useTheme();

  const { isMobileOrSmaller, isTabletOrSmaller, isLaptopOrSmaller } = useBreakpoints();

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
      <Typography variant={isMobileOrSmaller ? 'h5' : 'h4'} fontFamily="YComputer">
        COTATO CLUB MEMBERS
      </Typography>
    );
  };

  /**
   *
   */
  const renderDescription = () => {
    return (
      <Typography variant="body1" textAlign="center">
        코테이토의 팀이 모이면, <br /> 도전을 시도할 수 있는 기술과 지식이 성장해요.
      </Typography>
    );
  };

  /**
   *
   */
  const renderCotatoCharacters = () => {
    return (
      <Grid2
        container
        spacing={{
          xs: 0,
          sm: 4,
          md: 8,
          lg: 12,
        }}
        columns={{
          sm: 16,
          md: 16,
        }}
      >
        {COTATO_CHARCTER_SVG_LIST.map((svg) => {
          const key = Object.keys(svg)[0] as COTATO_CHARCTER_KEYS;
          const Character = svg[key]?.component as React.FunctionComponent<
            React.SVGProps<SVGSVGElement>
          >;
          const width = svg[key]?.width as string;
          const tooltip = svg[key]?.tooltip as string;

          return (
            <Grid2
              key={key}
              ref={(ref) => tooltipRefs.current.push(ref)}
              size={{
                lg: 4,
                md: 4,
                sm: 4,
                xs: 6,
              }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              marginTop={isTabletOrSmaller ? '3rem' : '0rem'}
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
                <Box width={isLaptopOrSmaller ? '6rem' : '8rem'}>
                  <Character
                    width={isLaptopOrSmaller ? `calc(${width} * 0.5)` : width}
                    height={isTabletOrSmaller ? '6rem' : isLaptopOrSmaller ? '8rem' : '10rem'}
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
            </Grid2>
          );
        })}
      </Grid2>
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
      <Stack width="100%" alignItems="center">
        {renderCotatoCharacters()}
      </Stack>
      <HomeFooter />
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
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  gap: 3rem;
  font-family: 'YComputer';

  ${media.tablet`
    padding: 1.5rem 0 0.5rem 0;
  `}

  ${media.mobile`
    padding: 2rem 0 0;
  `}
`;

export default HomeNewThirdSection;
