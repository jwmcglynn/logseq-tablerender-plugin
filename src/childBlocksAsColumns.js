import React from 'react';

function getFirstChildren(blockData) {
  if (blockData.length == 0) {
    return [];
  }

  let trace = blockData;
  let result = [trace.content];

  while (trace.children.length > 0) {
    trace = trace.children[0];
    result.push(trace.content);
  }

  return result;
}

export const childBlocksAsColumns = (blockData) => {
  // Column Headers Start
  // When children are treated as rows, column headers come from the trace of first children of the tree.
  let colArr = [];
  if (blockData.length > 0) {
    for (const [i, value] of getFirstChildren(blockData[0]).entries()) {
      let payload = {
        Header: value,
        accessor: `col${i + 1}`,
      };
      colArr.push(payload);
    }
  }

  const columns = React.useMemo(() => colArr, []);
  // Column Headers End

  // Data Row Start
  // Rows are traces of the subsequent children of the blockData tree.
  let rowArr = [];
  for (let i = 1; i < blockData.length; i++) {
    let payload = {};
    for (const [j, value] of getFirstChildren(blockData[i]).entries()) {
      payload[`col${j + 1}`] = value;
    }
    rowArr.push(payload);
  }

  const data = React.useMemo(() => rowArr, []);
  // Data Row End

  return { columns, data };
};
