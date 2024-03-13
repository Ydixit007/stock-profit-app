import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { getStockName } from "@/services/appServices";
import { useDebounce } from "@/hooks";

const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    getSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchData([]);
  }, [open]);

  const getSearch = async () => {
    setSearchData(await getStockName(debouncedSearch));
    console.log(searchData);
  };
  
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Search Symbol
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onChangeCapture={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
          placeholder="Search a symbol"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchData &&
              searchData.map((result, index) => {
                return (
                  <CommandItem key={index} className="cursor-pointer">
                    {result.shortname}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchInput;
