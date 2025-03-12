'use client';

import styled from 'styled-components';
import { ChangeEvent } from 'react';

const SearchBarWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
`;

const SearchBarInput = styled.input`
  width: 300px;
  height: 30px;
`;
const SearchBarBtn = styled.button`
  background-color: #007bff;
  width: 50px;
  height: 30px;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

export default function SearchBar() {
  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const searchBtnClick = () => {
    console.log('click');
  };
  return (
    <SearchBarWarp>
      <SearchBarInput
        type="text"
        onChange={searchInputChange}
        placeholder="링크를 입력해주세요"
      />
      <SearchBarBtn onClick={searchBtnClick}>버튼</SearchBarBtn>
    </SearchBarWarp>
  );
}
