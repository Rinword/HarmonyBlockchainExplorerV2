import { Text } from "grommet";
import React from "react";
import Big from "big.js";
import { formatNumber as _formatNumber } from "src/components/ui/utils";

import { useERC20Pool } from "src/hooks/ERC20_Pool";

interface ONEValueProps {
  value: string | number;
  tokenAddress?: string;
  style?: React.CSSProperties;
  formatNumber?: boolean;
}

Big.DP = 18;
Big.NE = -18;
Big.PE = 15;

// @ts-ignore
export const TokenValue = (props: ONEValueProps) => {
  const { value, tokenAddress = "", style, formatNumber } = props;
  const erc20Map = useERC20Pool();
  //TODO remove hardcode
  const tokenInfo = erc20Map[tokenAddress] || { decimals: 14, symbol: "" };

  if (!value) {
    return null;
  }

  const bi = Big(value).div(10 ** tokenInfo.decimals);
  const v = formatNumber ? _formatNumber(bi.toNumber()) : bi.toString();

  return (
    <Text size="small" style={style}>
      <b>{v}</b> {tokenInfo.symbol}
    </Text>
  );
};
