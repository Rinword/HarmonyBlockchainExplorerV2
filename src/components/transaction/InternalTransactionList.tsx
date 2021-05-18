import React, { useState } from "react";
import { Box, Text } from "grommet";

import { TransactionsTable } from "src/components/tables/TransactionsTable";
import { Filter, InternalTransaction } from "src/types";
import { Address, ONEValue, TransactionType } from "src/components/ui";

interface InternalTransactionListProps {
  list: InternalTransaction[];
  hash: string;
  timestamp: string;
}

const initFilter: Filter = {
  offset: 0,
  limit: 100,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function InternalTransactionList(props: InternalTransactionListProps) {
  const { list, hash, timestamp } = props;
  const [filter, setFilter] = useState<Filter>(initFilter);

  const { limit = 10 } = filter;

  return (
    <Box margin={{ top: "medium" }}>
      <TransactionsTable
        columns={getColumns({ timestamp })}
        data={list.sort((a, b) => (a.index > b.index ? 1 : -1))}
        totalElements={100}
        showIfEmpty
        hidePagination
        emptyText={"No Internal Transactions for this hash " + hash}
        limit={+limit}
        filter={filter}
        setFilter={setFilter}
        minWidth="960px"
      />
    </Box>
  );
}

function getColumns(props?: any) {
  const { timestamp } = props;

  return [
    {
      property: "type",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Type
        </Text>
      ),
      render: (data: InternalTransaction) => (
        <Text size="small">
          <TransactionType type={data.type} />
        </Text>
      ),
    },
    {
      property: "method",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Suggested Method
        </Text>
      ),
      render: (data: InternalTransaction) => {
        const signature =
          // @ts-ignore
          data.signatures &&
          // @ts-ignore
          data.signatures.map((s) => s.signature)[0].split("(")[0];
        return <Text size="small">{signature || "—"}</Text>;
      },
    },
    {
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: InternalTransaction) => (
        <Text size="small">
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
      render: (data: InternalTransaction) => (
        <Text size="small">
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
      render: (data: InternalTransaction) => (
        <Box justify="center" align="end">
          <ONEValue value={data.value} timestamp={timestamp} />
        </Box>
      ),
    },
  ];
}
