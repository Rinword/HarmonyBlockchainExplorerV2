import React from 'react';
import styled from 'styled-components';
import { Button as GButton } from 'grommet';


export function Button(props: any) {
  return <StyledButton {...props} />
}

const StyledButton = styled(GButton)`
  border: 1px solid ${props => props.theme.global.colors[props.theme.button.borderColor]};
  padding: 8px 5px;
  border-radius: 4px;
  background-color: transparent;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.global.colors.brand};
  transition: 0.3s ease all;
  
  &:hover {
    // background-color: ${props => props.theme.global.colors.border}; 
    letter-spacing: 0.3px;
  }
`;