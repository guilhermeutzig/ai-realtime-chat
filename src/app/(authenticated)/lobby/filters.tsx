"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const Filters = () => {
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
  }, 500);

  return (
    <Input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="mb-3 w-[200px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
    />
  );
};

export default Filters;
