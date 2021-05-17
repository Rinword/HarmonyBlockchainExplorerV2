import React, { useEffect, useState } from "react";

import { Box, DataTable, Text, Spinner } from "grommet";
import { Filter, RPCTransactionHarmony } from "src/types";
import { useHistory } from "react-router-dom";
import { FormNextLink } from "grommet-icons";
import {
  Address,
  formatNumber,
  RelativeTimer,
  PaginationNavigator,
  PaginationRecordsPerPage,
  ONEValue,
} from "src/components/ui";

function getColumns(props: any) {
  const { history } = props;
  return [
    {
      property: "shard",
      size: 'xxsmall',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
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
      property: "hash",
      size: 'xsmall',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text
          size="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/tx/${data.hash}`);
          }}
          color="brand"
        >
          <Address address={data.hash} isShort />
        </Text>
      ),
    },
    {
      property: "block_number",
      size: '260px',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Block number
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => {
        return (
          <Text
            size="small"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/block/${data.blockNumber}`);
            }}
            color="brand"
          >
            {formatNumber(+data.blockNumber)}
          </Text>
        );
      },
    },
    {
      property: "from",
      size: 'large',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Address address={data.from} style={{ fontSize: "12px" }} />
      ),
    },
    {
      property: "to",
      size: 'large',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          To
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Address address={data.to} style={{ fontSize: "12px" }} />
      ),
    },
    {
      property: "value",
      size: '380px',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          ONEValue
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box justify="center">
          <ONEValue value={data.value} timestamp={data.timestamp} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      size: '280px',
      resizeable: false,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box direction="row" gap="xsmall" justify="end">
          {/*<Text size="small">*/}
          {/*  {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")},*/}
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

interface TransactionTableProps {
  data: any[];
  columns?: any[];
  totalElements: number;
  limit: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  showIfEmpty?: boolean;
  emptyText?: string;
  hidePagination?: boolean;
  isLoading?: boolean;
  hideCounter?: boolean;
  minWidth?: string;
  noScrollTop?: boolean;
}

export function TransactionsTable(props: TransactionTableProps) {
  const history = useHistory();
  const {
    data,
    totalElements,
    limit,
    filter,
    setFilter,
    showIfEmpty,
    emptyText = "No data to display",
    columns,
    hidePagination,
    isLoading,
    hideCounter,
    noScrollTop,
    minWidth = "1310px",
  } = props;

  const _IsLoading = (!data.length && !showIfEmpty) || isLoading;

  if (!data.length && !_IsLoading) {
    return (
      <Box style={{ height: "120px" }} justify="center" align="center">
        <Text size="small">{emptyText}</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        direction="row"
        justify={hidePagination ? "start" : "between"}
        pad={{ bottom: "small" }}
        margin={{ bottom: "small" }}
        border={{ size: "xsmall", side: "bottom", color: "border" }}
      >
        {!hideCounter && (
          <Text style={{ flex: "1 1 100%" }}>
            <b>{Math.min(limit, data.length)}</b> transaction
            {data.length !== 1 ? "s" : ""} shown
          </Text>
        )}
        {!hidePagination && (
          <PaginationNavigator
            onChange={setFilter}
            filter={filter}
            totalElements={totalElements}
            elements={data}
            noScrollTop={noScrollTop}
            property="block_number"
          />
        )}
      </Box>
      <Box
        style={{
          overflow: "auto",
          opacity: _IsLoading ? "0.4" : "1",
          transition: "0.1s all",
          height: _IsLoading ? "529px" : "auto",
        }}
      >
        <DataTable
          className={"g-table-header"}
          style={{ width: "100%", minWidth }}
          columns={columns ? columns : getColumns({ history })}
          data={data}
          step={10}
          border={{
            header: {
              color: "brand",
            },
            body: {
              color: "border",
              side: "top",
              size: "1px",
            },
          }}
        />
      </Box>
      {!hidePagination && (
        <Box
          direction="row"
          justify="between"
          align="center"
          margin={{ top: "medium" }}
        >
          <PaginationRecordsPerPage filter={filter} onChange={setFilter} />
          <PaginationNavigator
            onChange={setFilter}
            filter={filter}
            totalElements={totalElements}
            elements={data}
            noScrollTop={noScrollTop}
            property="block_number"
          />
        </Box>
      )}
    </>
  );
}
