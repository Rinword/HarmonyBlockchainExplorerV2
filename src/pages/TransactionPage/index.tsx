import { TransactionDetails } from "src/components/transaction/TransactionDetails";
import { InternalTransactionList } from "src/components/transaction/InternalTransactionList";
import { TransactionLogs } from "src/components/transaction/TransactionLogs";
import { InternalTransaction, RPCStakingTransactionHarmony } from "src/types";
import { BaseContainer, BasePage } from "src/components/ui";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Text, Box, Spinner, Heading } from "grommet";
import {
  getInternalTransactionsByField,
  getTransactionByField,
  getTransactionLogsByField,
  getByteCodeSignatureByHash,
} from "src/api/client";
import { AllBlocksTable } from "../AllBlocksPage/AllBlocksTable";

export const TransactionPage = () => {
  // hash or number
  // @ts-ignore
  const { id } = useParams();
  const [tx, setTx] = useState<RPCStakingTransactionHarmony>(
    {} as RPCStakingTransactionHarmony
  );
  const [trxs, setTrxs] = useState<InternalTransaction[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTx = async () => {
      let trx;
      if (id.length === 66) {
        trx = await getTransactionByField([0, "hash", id]);
      }
      setTx(trx as RPCStakingTransactionHarmony);
    };

    getTx();
  }, [id]);

  useEffect(() => {
    const getInternalTxs = async () => {
      try {
        //@ts-ignore
        const txs = await getInternalTransactionsByField([
          0,
          "transaction_hash",
          tx.hash,
        ]);

        const methodSignatures = await Promise.all(
          txs.map((tx) => getByteCodeSignatureByHash([tx.input.slice(0, 10)]))
        );

        const txsWithSignatures = txs.map((l, i) => ({
          ...l,
          signatures: methodSignatures[i],
        }));

        setTrxs(txsWithSignatures as InternalTransaction[]);
      } catch (err) {
        console.log(err);
      }
    };

    getInternalTxs();
  }, [tx]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        //@ts-ignore
        const logs: any[] = await getTransactionLogsByField([
          0,
          "transaction_hash",
          tx.hash,
        ]);

        const logsSignatures = await Promise.all(
          logs.map((l) => getByteCodeSignatureByHash([l.topics[0]]))
        );

        const logsWithSignatures = logs.map((l, i) => ({
          ...l,
          signatures: logsSignatures[i],
        }));

        setLogs(logsWithSignatures as any);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getLogs();
  }, [tx]);

  if (isLoading) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Heading size="small" margin={{ bottom: "medium", top: "0" }}>
        Transaction
      </Heading>
      <BasePage>
        <Tabs alignControls="start" justify="start">
          <Tab title={<Text size="small">Transaction Details</Text>}>
            <TransactionDetails transaction={tx} />
          </Tab>
          <Tab title={<Text size="small">Internal Transactions</Text>}>
            <InternalTransactionList
              list={trxs}
              hash={tx.hash}
              timestamp={tx.timestamp}
            />
          </Tab>
          <Tab title={<Text size="small">Logs</Text>}>
            <TransactionLogs logs={logs} hash={tx.hash} />
          </Tab>
        </Tabs>
      </BasePage>
    </BaseContainer>
  );
};
