import styled from 'styled-components';

export const DeleteBtn = styled.button`
  font: inherit;
  cursor: pointer;

  margin-left: 20px;
  margin-top: 20px;
  max-width: 100px;
  padding: 5px 4px;

  border: none;
  outline: none;
  font-size: 12px;
  border-radius: 4px;

  :hover {
    background-color: #c8e4fc;
  }
`;

export const List = styled.ul`
  margin-top: 10px;
`;

export const Item = styled.li`
  font-size: 16px;
`;
