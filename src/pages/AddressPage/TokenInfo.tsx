import React from "react";
import { Box, Text } from "grommet";
import { Address, TokenValue } from "src/components/ui";

interface Token {
  balance: string;
  tokenAddress: string;
}

export function TokensInfo(props: { value: Token[] }) {
  const { value } = props;

  if (!value.filter((i) => filterWithBalance(i.balance)).length) {
    return <span>—</span>;
  }

  return (
    <Box>
      <Text size="small">HRC-20 Tokens:</Text>
      <Box style={{ maxHeight: "40vh", overflowY: "auto" }}>
        {value
          .filter((i) => filterWithBalance(i.balance))
          .map((i) => (
            <TokenInfo key={i.tokenAddress} value={i} />
          ))}
      </Box>
    </Box>
  );
}

function TokenInfo(props: { value: Token }) {
  const { value } = props;

  return (
    <Box
      direction="row"
      style={{ minWidth: "350px", maxWidth: "550px", flex: "0 0 auto" }}
      margin={{ bottom: "3px" }}
      gap="medium"
    >
      <Address address={value.tokenAddress} style={{ flex: "1 1 50%" }} />
      <TokenValue
        value={value.balance}
        tokenAddress={value.tokenAddress}
        style={{ flex: "1 1 50%", wordBreak: "break-word" }}
      />
    </Box>
  );
}

function filterWithBalance(balance: string) {
  return !!+balance;
}
