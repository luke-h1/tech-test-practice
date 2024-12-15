"use client";

import searchService, {
  SearchResponse,
} from "@frontend/services/searchService";
import { useEffect, useState, useCallback } from "react";
import storageService from "@frontend/services/localStorageService";
import Input from "@frontend/components/Input";
import styles from "./page.module.scss";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchItems, setSearchItems] = useState<SearchResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const onChange = async (text: string) => {
    const { paging, results } = await searchService.search(text, undefined);

    // make a new array of numbers based on the amount of data we have so we can render a button for each page
    const totalPages = Array.from(
      { length: paging.totalPages },
      (_, i) => i + 1
    );

    setCurrentPage(paging.page);
    setTotalPages(totalPages);
    setSearchItems(results);

    const history = storageService.getSync<string[]>("history") || [];

    if (history.length >= 5) {
      history.splice(0, 1);
    }

    const newHistory = [...history, text];
    storageService.setSync("history", newHistory);
    setSearchHistory(newHistory);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(debounce(onChange, 600), []);

  const handleChange = (text: string) => {
    debouncedOnChange(text);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    const { paging, results } = await searchService.search(text, page);
    setSearchItems(results);
    setCurrentPage(paging.page);
  };

  useEffect(() => {
    (async () => {
      const { paging, results } = await searchService.search(text, 1);
      setSearchItems(results);
      setCurrentPage(paging.page);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const history = storageService.getSync<string[]>("history") || [];
    setSearchHistory(history);
  }, []);

  return (
    <div className={styles.container}>
      <Input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
          handleChange(e.target.value);
        }}
        value={text}
        label="Search"
        placeholder="TypeScript"
      />

      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {searchItems &&
            searchItems.map((item) => <li key={item.title}>{item.title}</li>)}
        </ul>
      </div>
      <div className={styles.listWrapper}>
        <h3>Search History</h3>
        <ul className={styles.list}>
          {searchHistory &&
            searchHistory.map((history) => <li key={history}>{history}</li>)}
        </ul>
      </div>

      <div className={styles.paginationWrapper}>
        {totalPages &&
          totalPages.map((page) => (
            <button
              className={styles.button}
              style={{
                color: page === currentPage ? "red" : "black",
              }}
              onClick={() => onPageChange(page)}
              type="button"
              key={page}
            >
              {page}
            </button>
          ))}
      </div>
    </div>
  );
}
