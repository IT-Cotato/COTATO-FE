import React from 'react';
import { ProfileCardSection, ProfileInput } from '../styles';
import styled from 'styled-components';
import { ReactComponent as Github } from '@/pages/MyPage/tempAsssets/github_icon.svg';
import { ReactComponent as Link } from '@/pages/MyPage/tempAsssets/link2_icon.svg';

//
//
//

interface LinksSectionProps {
  isModifying: boolean;
  links: Array<{
    urlType: string;
    url: string;
  }>;
  onChange: (index: number, value: string) => void;
}

//
//
//

/**
 * 소개 링크 영역
 * @param isModifying 수정중인 상태
 */
const LinksSection = ({ isModifying, links, onChange }: LinksSectionProps) => {
  return (
    <ProfileCardSection>
      <ProfileCardLinkInputSection>
        <LinkContainer>
          <Github />
          <ProfileInput
            size="small"
            disabled={!isModifying}
            value={links[0]?.url}
            onChange={(e) => onChange(0, e.target.value)}
          />
        </LinkContainer>
        <LinkContainer>
          <Link />
          <ProfileInput
            size="small"
            disabled={!isModifying}
            value={links[1]?.url}
            onChange={(e) => onChange(1, e.target.value)}
          />
        </LinkContainer>
      </ProfileCardLinkInputSection>
    </ProfileCardSection>
  );
};

//
//
//

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
