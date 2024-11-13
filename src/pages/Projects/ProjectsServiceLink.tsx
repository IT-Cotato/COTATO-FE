import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

//
//
//

interface ProjectsLinkProps {
  name: string;
  bgColor: string;
  color?: string;
  link?: string;
  logo?: React.ReactNode;
}

//
//
//

const ProjectsLink = ({ link, logo, name, bgColor, color }: ProjectsLinkProps) => {
  const theme = useTheme();

  //
  //
  //

  if (!link) {
    return null;
  }

  return (
    <StyledLink
      to={link}
      style={{
        backgroundColor: bgColor,
        color: color ? color : theme.colors.common.white_const,
      }}
    >
      <Box width="1.375rem" height="1.375rem">
        {logo}
      </Box>
      {name}
    </StyledLink>
  );
};

export default ProjectsLink;

const StyledLink = styled(Link)`
  width: auto;
  height: 2rem;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3125rem;
  text-decoration: none;
  word-break: keep-all;
`;
