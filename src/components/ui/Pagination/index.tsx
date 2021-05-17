import React, {useEffect} from "react";
import { Box, Text, Select } from "grommet";
import { Filter } from "src/types";
import { FormPrevious, FormNext } from "grommet-icons";
import { formatNumber } from "src/components/ui/utils";

export type TPaginationAction = 'nextPage' | 'prevPage';

interface PaginationNavigator {
  filter: Filter;
  elements: any[];
  totalElements: number;
  onChange: (filter: Filter, action: TPaginationAction) => void;
  property: string;
  noScrollTop?: boolean;
  showPages?: boolean;
}

export function PaginationNavigator(props: PaginationNavigator) {
  const { elements, totalElements, filter, onChange, property, noScrollTop, showPages } = props;
  const { offset, limit = 10 } = filter;

  // useEffect(() => {
  //     const scrollBody = document.getElementById("scrollBody");
  //
  //     if (scrollBody && !noScrollTop) {
  //       scrollBody.scrollTo({ top: 0 });
  //     }
  // }, [filter]);

  const blockNumbers = elements.map((b) => +b.blockNumber);
  const minBlockNumber = blockNumbers.reduce(
    (a, b) => (a === -1 || a > b ? b : a),
    -1
  );
  const maxBlockNumber = blockNumbers.reduce((a, b) => Math.max(a, b), 0);

  const onPrevClick = () => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    const innerFilter = newFilter.filters.find((i) => i.property === property);
    if (innerFilter) {
      innerFilter.type = "lt";
      innerFilter.value = maxBlockNumber + limit + 1;
    }

    onChange(newFilter, 'prevPage');
  };

  const onNextClick = () => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    const innerFilter = newFilter.filters.find((i) => i.property === property);
    if (innerFilter) {
      innerFilter.type = "lt";
      innerFilter.value = minBlockNumber;
    }

    onChange(newFilter, 'nextPage');
  };

  return (
    <Box style={{ flex: '0 0 auto' }}>
      <Pagination
        //@ts-ignore
        currentPage={+(+offset / limit).toFixed(0) + 1}
        totalPages={+Math.ceil(Number(totalElements) / limit).toFixed(0)}
        onPrevPageClick={onPrevClick}
        onNextPageClick={onNextClick}
        showPages={showPages}
      />
    </Box>
  );
}
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  showPages?: boolean;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPrevPageClick, onNextPageClick, showPages } = props;
  return (
    <Box direction="row" gap="small">
      <FormPrevious onClick={onPrevPageClick} style={{cursor: "pointer"}}/>
      {showPages && <Text style={{fontWeight: "bold"}}>{formatNumber(+currentPage)}</Text>}
      {showPages && <Text style={{fontWeight: 300}}>/</Text>}
      {showPages && <Text style={{fontWeight: 300}}>{formatNumber(+totalPages)}</Text>}
      <FormNext onClick={onNextPageClick} style={{cursor: "pointer"}}/>
    </Box>
  );
}

interface ElementsPerPage {
  filter: Filter;
  onChange: (filter: Filter) => void;
  options?: number[];
}

const defaultOptions: string[] = ["10", "25", "50", "100"];

export function PaginationRecordsPerPage(props: ElementsPerPage) {
  const { filter, options = defaultOptions, onChange } = props;
  const { limit = 10 } = filter;

  const onChangeLimit = (props: { option: number }) => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    newFilter.limit = Number(props.option);
    onChange(newFilter);
  };

  return (
    <Box direction="row" gap="small" align="center">
      <Box style={{ width: "95px" }}>
        <Select
          options={options}
          value={limit.toString()}
          onChange={onChangeLimit}
        />
      </Box>
      <Text size="small">records per page</Text>
    </Box>
  );
}
