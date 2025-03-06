import React from 'react';
import { ProfileCardSection, ProfileInput } from '../styles';
import styled from 'styled-components';
import { ReactComponent as Github } from '@/pages/MyPage/tempAsssets/github_icon.svg';
import { ReactComponent as Link } from '@/pages/MyPage/tempAsssets/link2_icon.svg';
import { CotatoProfileLinkResponseUrlTypeEnum } from 'cotato-openapi-clients';

interface LinksSectionProps {
  isModifying: boolean;
  links: Array<{
    urlType: string;
    url: string;
  }>;
  onChange: (urlType: CotatoProfileLinkResponseUrlTypeEnum, value: string) => void;
}

const LinksSection = ({ isModifying, links, onChange }: LinksSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardLinkInputSection>
        <LinkContainer>
          <Github />
          <ProfileInput
            size="small"
            disabled={!isModifying}
            value={
              links.find((link) => link.urlType === CotatoProfileLinkResponseUrlTypeEnum.Github)
                ?.url ?? ''
            }
            onChange={(e) => onChange(CotatoProfileLinkResponseUrlTypeEnum.Github, e.target.value)}
          />
        </LinkContainer>
        <LinkContainer>
          <Link />
          <ProfileInput
            size="small"
            disabled={!isModifying}
            value={
              links.find((link) => link.urlType === CotatoProfileLinkResponseUrlTypeEnum.Blog)
                ?.url ?? ''
            }
            onChange={(e) => onChange(CotatoProfileLinkResponseUrlTypeEnum.Blog, e.target.value)}
          />
        </LinkContainer>
      </ProfileCardLinkInputSection>
    </ProfileCardSection>
  );
};

const ProfileCardLinkInputSection = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

export default LinksSection;
