import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

function useParamsHistoryData(query, symbol, timestampMax, timestampMin) {
  const debugQueryName = useMemo(() => query.definitions[0]?.name?.value, [
    query,
  ]);

  console.log(debugQueryName, 'BEGIN useParamsHistoryData');
  const queryResult = useQuery(query, {
    variables: {
      symbol,
      timestamp_gt: timestampMin,
      timestamp_lte: timestampMax,
      first: 1000,
    },
  });

  const { loading, data, fetchMore } = queryResult;

  const paramsHistory = data?.reserves?.[0]?.paramsHistory;

  const maxLoadedTimestamp = useMemo(
    () =>
      paramsHistory
        ?.map(({ timestamp }) => timestamp)
        ?.reduce((prev, current) => Math.max(prev, current), 0),
    [paramsHistory]
  );

  console.log(debugQueryName, {
    loading,
    maxLoadedTimestamp,
    data,
    paramsHistory,
  });

  useEffect(() => {
    console.log(debugQueryName, 'run useEffect, ', { maxLoadedTimestamp });
    if (!maxLoadedTimestamp) return;

    (async function () {
      console.log(debugQueryName, 'run fetchMore! w/', { maxLoadedTimestamp });
      fetchMore({
        variables: {
          timestamp_gt: maxLoadedTimestamp,
        },
      });
    })();
  }, [maxLoadedTimestamp, fetchMore, debugQueryName]);

  console.log(debugQueryName, 'END useParamsHistoryData');
  return queryResult;
}

export { useParamsHistoryData };
