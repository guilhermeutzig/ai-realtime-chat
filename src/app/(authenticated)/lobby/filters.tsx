"use client";

import { type ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/lib/debounce";

const Filters = () => {
  const [search, setSearch] = useState("");
  const [canFetchSearch, setCanFetchSearch] = useState(false);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (canFetchSearch) {
      setCanFetchSearch(false);
    }
  }, [debouncedSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!canFetchSearch) setCanFetchSearch(true);
    setSearch(event.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleChange}
      className="mb-3 w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
    />
  );
};

export default Filters;
