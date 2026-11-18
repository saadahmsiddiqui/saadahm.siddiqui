import { useLayoutEffect, useRef, useState } from "react";

/** Max height that fits the table header plus the first `rows` body rows. */
export function useVisibleRowsHeight(rows: number) {
  const ref = useRef<HTMLTableElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const table = ref.current;
    if (!table) return;
    const measure = () => {
      const bodyRows = table.tBodies[0]?.rows;
      if (!bodyRows || bodyRows.length <= rows) return setHeight(undefined);
      const head = table.tHead?.getBoundingClientRect().height ?? 0;
      let total = head;
      for (let i = 0; i < rows; i++)
        total += bodyRows[i].getBoundingClientRect().height;
      setHeight(Math.ceil(total));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(table);
    return () => observer.disconnect();
  }, [rows]);

  return { ref, height };
}
