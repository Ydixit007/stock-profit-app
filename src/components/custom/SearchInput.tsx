import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { getStockName } from "@/services/appServices";
import { useDebounce } from "@/hooks";
import { GoSearch } from "react-icons/go";

interface SearchInputInterface {
  setCurrentStock: Dispatch<
    SetStateAction<{ stockName: string; stockSymbol: string }>
  >;
}

const SearchInput = ({ setCurrentStock }: SearchInputInterface) => {
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
  };

  const setStock = (stockName: string, stockSymbol: string) => {
    setCurrentStock({
      stockName: stockName,
      stockSymbol: stockSymbol,
    });
    setOpen(false);
  };

  return (
    <>
      <GoSearch
        className="cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      />
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
                  <CommandItem
                    onSelect={() => {
                      setStock(result.shortname, result.symbol);
                    }}
                    key={index}
                    className="cursor-pointer pointer-events-auto"
                  >
                    {`${result.shortname} - ${result.exchDisp}`}
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
