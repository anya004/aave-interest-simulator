import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

function useParamsHistoryData(query, symbol, timestampMax, timestampMin) {
  const queryResult = useQuery(query, {
    variables: {
      symbol,
      timestamp_gt: timestampMin,
      timestamp_lte: timestampMax,
      first: 1000,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data, fetchMore } = queryResult;
  const paramsHistory = data?.reserves?.[0]?.paramsHistory;

  const maxLoadedTimestamp = useMemo(
    () =>
      paramsHistory
        ?.map(({ timestamp }) => timestamp)
        ?.reduce((prev, current) => Math.max(prev, current), 0),
    [paramsHistory]
  );

  useEffect(() => {
    if (!maxLoadedTimestamp) return;

    (async function () {
      fetchMore({
        variables: {
          timestamp_gt: maxLoadedTimestamp,
        },
      });
    })();
  }, [maxLoadedTimestamp, fetchMore]);

  return queryResult;
}

export { useParamsHistoryData };
