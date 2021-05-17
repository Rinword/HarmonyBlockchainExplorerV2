import React from 'react';
import { Heading } from 'grommet';
import { BasePage, BaseContainer } from 'src/components/ui';
import { AllBlocksTable } from './AllBlocksTable';

export function AllBlocksPage() {

  return (
    <BaseContainer pad={{ horizontal: '0' }}>
      <Heading size="small" margin={{ bottom: 'medium', top: '0' }}>Blocks</Heading>
      <BasePage>
        <AllBlocksTable />
      </BasePage>
    </BaseContainer>
  )
}