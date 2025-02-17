import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CotatoIcon from './CotatoIcon';

//
//
//

interface CotatoSelectBoxProps {
  defaultVal: string;
  selectList: string[];
  metaDatas?: any[];
}

//
//
//

const CotatoSelectBox = ({ defaultVal, selectList, metaDatas }: CotatoSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<any | null>(null);

  /**
   *
   */
  const handleItemClick = (item: string, meta?: any) => {
    setSelected(item);
    setSelectedMeta(meta);
    setIsOpen(false);
  };

  useEffect(() => {
    if (metaDatas?.length) {
      setSelectedMeta(metaDatas[metaDatas.length - 1]);
    }
  }, [metaDatas]);

  return (
    <Wrapper>
      <Container>
        <InputBox onClick={() => setIsOpen(!isOpen)}>
          <p>{selected || defaultVal}</p>
          <span style={{ visibility: 'hidden' }}>{selectedMeta}</span>
          <CotatoIcon
            icon={isOpen ? 'angle-up-solid' : 'angle-down-solid'}
            size="1.25rem"
            color={(theme) => theme.colors.common.black_const}
          />
        </InputBox>
        {isOpen && (
          <ListBox>
            {selectList.map((selectItem, i) => (
              <ListItem
                key={i}
                isSelected={selected === selectItem}
                onClick={() => handleItemClick(selectItem, metaDatas && metaDatas[i])}
              >
                {selectItem}
              </ListItem>
            ))}
          </ListBox>
        )}
      </Container>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  width: 8.4rem;
  min-height: 3.3rem;
  height: fit-content;
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.3rem;
  display: flex;
  gap: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gray20};
  p {
    color: ${({ theme }) => theme.colors.common.black_const} !important;
    font-size: ${({ theme }) => theme.fontSize.md};
    text-align: center;
  }
`;

const ListBox = styled.div`
  position: absolute;
  top: 3.3rem;
  margin-top: 0.25rem;
  width: 100%;
  height: fit-content;
  background: ${({ theme }) => theme.colors.common.white_const};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray20};
  z-index: 1;
`;

const ListItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 3.3rem;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.gray20 : theme.colors.common.white_const};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.75rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray20};
  }
`;

export default CotatoSelectBox;
