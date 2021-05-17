import React from "react";
import { Box, Text } from "grommet";
import {
  Address,
  ExpandString,
  formatNumber,
  TokenValue,
} from "src/components/ui";
import { AddressDetails } from "src/types";
import { TokensInfo } from "./TokenInfo";
import { Erc20, useERC20Pool } from "src/hooks/ERC20_Pool";

interface AddressDetailsProps {
  address: string;
  contracts: AddressDetails;
  tokens: any[];
}

export function AddressDetailsDisplay(props: AddressDetailsProps) {
  const { address, contracts, tokens } = props;
  const erc20Map = useERC20Pool();

  const erc20Token = erc20Map[address] || null;
  const type = getType(contracts, erc20Token);

  const data = { ...contracts, ...erc20Token, address, token: tokens };

  if (!data) {
    return null;
  }

  const items: string[] = Object.keys(data);

  return (
    <Box>
      {items.sort(sortByOrder).map((i) => (
        //@ts-ignore
        <DetailItem key={i} name={i} data={data} type={type} />
      ))}
    </Box>
  );
}

function DetailItem(props: { data: any; name: string; type: TAddressType }) {
  const { data, name, type } = props;

  if (
    !addressPropertyDisplayNames[name] ||
    !addressPropertyDisplayValues[name] ||
    data[name] === null
  ) {
    return null;
  }

  return (
    <Box
      direction="row"
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text
        style={{ width: "20%" }}
        color="minorText"
        size="small"
        margin={{ right: "xsmall" }}
      >
        {addressPropertyDisplayNames[name](data, { type })}
      </Text>
      <Text style={{ width: "80%", wordBreak: "break-all" }} size="small">
        {addressPropertyDisplayValues[name](data[name], data, { type })}
      </Text>
    </Box>
  );
}

const addressPropertyDisplayNames: Record<
  string,
  (data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: (data, options) => {
    if (options.type === "erc20") {
      return `HRC20 ${data.name}`;
    }
    if (options.type === "contract") {
      return "Contract";
    }

    return "Address";
  },
  value: () => "Value",
  creatorAddress: () => "Creator",
  solidityVersion: () => "Solidity version",
  IPFSHash: () => "IPFS hash",
  meta: () => "Meta",
  bytecode: () => "Bytecode",
  token: () => "Token",
  name: () => "Name",
  symbol: () => "Symbol",
  decimals: () => "Decimals",
  totalSupply: () => "Total Supply",
  holders: () => "Holders",
};

const addressPropertyDisplayValues: Record<
  string,
  (value: any, data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: (value, data, options: { type: TAddressType }) =>  {
    if(options.type === 'erc20') {
      return <Address address={value} displayHash />
    }
    return <Text size="small">{value}</Text>
  },
  value: (value) => <TokenValue value={value} />,
  creatorAddress: (value) => <Address address={value} />,
  solidityVersion: (value) => value,
  IPFSHash: (value) => value,
  meta: (value) => value,
  bytecode: (value) => <ExpandString value={value || ""} />,
  token: (value) => <TokensInfo value={value} />,
  name: (value) => value,
  symbol: (value) => value,
  decimals: (value) => value,
  totalSupply: (value) => <TokenValue value={value} />,
  holders: (value: string) => formatNumber(+value),
};

function sortByOrder(a: string, b: string) {
  return addressPropertyOrder[a] - addressPropertyOrder[b];
}

const addressPropertyOrder: Record<string, number> = {
  address: 10,
  value: 11,
  token: 12,
  creatorAddress: 13,

  name: 20,
  symbol: 21,
  decimals: 22,
  totalSupply: 23,
  holders: 24,

  solidityVersion: 31,
  IPFSHash: 32,
  meta: 33,
  bytecode: 34,
};

type TAddressType = "address" | "contract" | "erc20" | "erc721";

function getType(contracts: AddressDetails, erc20Token: Erc20): TAddressType {
  if (!!contracts && !!erc20Token) {
    return "erc20";
  }

  if (!!contracts) {
    return "contract";
  }

  return "address";
}
