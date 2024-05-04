"use client";

import { Input } from "@/components/ui/input";
import { type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  onSearch: (search: string) => void;
};

const Filters = ({ onSearch }: Props) => {
  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    300,
  );

  return (
    <Input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
    />
  );
};

export default Filters;
