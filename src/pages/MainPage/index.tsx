import React from "react";
import { Box, Text } from "grommet";
import { Button } from "src/components/ui";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from "src/Responive/breakpoints";
import { BaseContainer, BasePage } from "src/components/ui";
import { Metrics } from "src/components/metrics";
import { LatestBlocksTable } from "./LatestBlocksTable";
import { LatestTransactionsTable } from "./LatestTransactionsTable";

export function MainPage() {
  const history = useHistory();
  const isLessDesktop = useMediaQuery({ maxDeviceWidth: breakpoints.desktop });

  return (
    <BaseContainer pad="0">
      <Metrics />
      <Box direction={isLessDesktop ? 'column' : 'row'} gap="medium">
        <BasePage style={{ flex: "1 1 100%" }}>
          <Box border={{ size: "xsmall", side: 'bottom' }} pad={{ bottom: 'small'}} margin={{ bottom: 'small' }}>
            <Text size="large" weight="bold">
              Latest Blocks
            </Text>
          </Box>

          <LatestBlocksTable />
          <Button
            margin={{ top: "medium" }}
            onClick={() => history.push("/blocks")}
          >
            VIEW ALL BLOCKS
          </Button>
        </BasePage>
        <BasePage style={{ flex: "1 1 100%" }}>
          <Box border={{ size: "xsmall", side: 'bottom' }} pad={{ bottom: 'small'}} margin={{ bottom: 'small' }}>
            <Text size="large" weight="bold">
              Latest Transactions
            </Text>
          </Box>
          <LatestTransactionsTable />
          <Button
            margin={{ top: "medium" }}
            onClick={() => history.push("/transactions")}
          >
            VIEW ALL TRANSACTIONS
          </Button>
        </BasePage>
      </Box>
    </BaseContainer>
  );
}
