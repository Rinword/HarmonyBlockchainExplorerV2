import React, { useEffect, useState } from "react";
import { Text, Box } from "grommet";
import {
  BasePage,
  BaseContainer,
  Address,
  ONEValue,
  RelativeTimer,
} from "src/components/ui";
import { AddressDetailsDisplay } from "./AddressDetails";
import { getRelatedTransactions, getContractsByField, getUserERC20Balances } from "src/api/client";
import {
  Filter,
  RelatedTransaction,
  RelatedTransactionType,
} from "src/types";
import { useParams } from "react-router-dom";
import { TransactionsTable } from "../../components/tables/TransactionsTable";
import { FormNextLink } from "grommet-icons";
import dayjs from "dayjs";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function AddressPage() {
  const [contracts, setContracts] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [relatedTrxs, setRelatedTrxs] = useState<RelatedTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //TODO remove hardcode
  // @ts-ignore
  const { id } = useParams();


  useEffect(() => {
    const getElements = async () => {
      setIsLoading(true);
      try {
        let relatedTransactions = await getRelatedTransactions([0, id, filter]);
        setRelatedTrxs(relatedTransactions);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getElements();
  }, [filter, id]);

  useEffect(() => {
    const getContracts = async () => {
      try {
        let contracts = await getContractsByField([0, "address", id]);
        setContracts(contracts);
      } catch (err) {
        setContracts(null);
      }
    };
    getContracts();
  }, [id]);

  useEffect(() => {
    const getTokens = async () => {
      try {
        let tokens = await getUserERC20Balances([id]);
        setTokens(tokens);
      } catch (err) {
        setTokens(null);
      }
    };
    getTokens();
  }, [id]);

  const { limit = 10 } = filter;

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Text size="xlarge" weight="bold" margin={{ bottom: "medium" }}>
        Address
      </Text>
      <BasePage margin={{ vertical: "0" }}>
        <AddressDetailsDisplay address={id} contracts={contracts} tokens={tokens} />
        <Text
          size="xlarge"
          margin={{ top: !!contracts ? "medium" : "0", bottom: "small" }}
        >
          Related transactions
        </Text>
        <TransactionsTable
          columns={getColumns()}
          data={relatedTrxs}
          totalElements={100}
          limit={+limit}
          filter={filter}
          isLoading={isLoading}
          setFilter={setFilter}
          noScrollTop
          minWidth="1266px"
        />
      </BasePage>
    </BaseContainer>
  );
}

function getColumns() {
  return [
    {
      property: "type",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Type
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="small">
          {relatedTxMap[data.transactionType] || data.transactionType}
        </Text>
      ),
    },
    {
      property: "hash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: any) => (
        <Address address={data.transactionHash} type="tx" isShort />
      ),
    },
    {
      property: "shard",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="3px" align="center">
          <Text size="small">{0}</Text>
          <FormNextLink
            size="small"
            color="brand"
            style={{ marginBottom: "2px" }}
          />
          <Text size="small">{0}</Text>
        </Box>
      ),
    },
    {
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="12px">
          <Address address={data.from} />
        </Text>
      ),
    },
    {
      property: "to",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          To
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="12px">
          <Address address={data.to} />
        </Text>
      ),
    },
    {
      property: "value",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          ONEValue
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box justify="center">
          <ONEValue value={data.value} timestamp={data.timestamp} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="xsmall" justify="end">
          {/*<Text size="small">*/}
          {/*  {!!data.timestamp*/}
          {/*    ? dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss") + ","*/}
          {/*    : "—"}*/}
          {/*</Text>*/}
          <RelativeTimer
            date={data.timestamp}
            updateInterval={1000}
            style={{ minWidth: "auto" }}
          />
        </Box>
      ),
    },
  ];
}

const relatedTxMap: Record<RelatedTransactionType, string> = {
  transaction: "Transaction",
  internal_transaction: "Internal Transaction",
  stacking_transaction: "Staking Transaction",
};
