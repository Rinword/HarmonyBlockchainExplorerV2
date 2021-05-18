import React from "react";
import { Box, Text } from "grommet";

import { Address } from "src/components/ui";

interface TransactionLogsProps {
  logs: any[];
  hash: string;
}

export function TransactionLogs(props: TransactionLogsProps) {
  const { logs, hash } = props;

  if (!logs.length) {
    return (
      <Box style={{ height: "120px" }} justify="center" align="center">
        <Text size="small">
          No Logs for <b>{hash}</b>
        </Text>
      </Box>
    );
  }

  return (
    <Box margin={{ top: "medium" }}>
      {logs
        .sort((a, b) => a.logIndex - b.logIndex)
        .map((log, i) => (
          <LogItem key={i} log={log} />
        ))}
    </Box>
  );
}

interface LogItemProps {
  log: {
    address: string;
    topics: string[];
    data: string;
    signatures: any[] | null;
  };
}

const LogItem = (props: LogItemProps) => {
  const { address, topics, data, signatures } = props.log;

  return (
    <Box
      gap="small"
      border={{ size: "xsmall", side: "bottom", color: "border" }}
      pad={{ bottom: "small" }}
    >
      <Box>
        <Text color="minorText" size="small">
          Address
        </Text>
        <Text size="small" color="brand">
          <Address address={address} style={{ wordBreak: "break-all" }} />
        </Text>
      </Box>

      {signatures && (
        <Box>
          <Text color="minorText" size="small">
            Suggested Event
          </Text>
          <Text size="small" color="brand">
            {signatures.map((s) => s.signature).join(", ")}
          </Text>
        </Box>
      )}

      <Box>
        <Text color="minorText" size="small">
          Topics
        </Text>
        <Box gap="xxsmall">
          {topics.map((topic, i) => (
            <Text size="small" color="brand" style={{ wordBreak: "break-all" }}>
              {topic}
              {i !== topics.length - 1 ? ", " : ""}
            </Text>
          ))}
        </Box>
      </Box>
      <Box>
        <Text color="minorText" size="small">
          Data
        </Text>
        <Text size="small" color="brand" style={{ wordBreak: "break-all" }}>
          {data}
        </Text>
      </Box>
    </Box>
  );
};
