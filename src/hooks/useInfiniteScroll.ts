import { useCallback, useRef } from 'react';

interface UseInfiniteScroll {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteScroll) => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (element: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (element) intObserver.current.observe(element);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return lastElementRef;
};
