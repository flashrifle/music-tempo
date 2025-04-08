'use client';

import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const SearchBarWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  gap: 10px;
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
  const [value, setValue] = useState('');
  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const searchBtnClick = () => {
    console.log('click');
    console.log(value);
  };
  return (
    <SearchBarWarp>
      <SearchBarInput
        type="text"
        onChange={searchInputChange}
        placeholder="링크를 입력해주세요"
      />
      <SearchBarBtn onClick={searchBtnClick}>검색</SearchBarBtn>
    </SearchBarWarp>
  );
}
