"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// combobox for name

export function ComboboxName({
  items,
  value,
  onChange,
}: {
  items: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Filter items based on search value (case-insensitive)
  const filteredItems = search
    ? items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-screen-sm justify-between"
        >
          {value
            ? items.find((item) => item.id === value)?.name
            : "Select item..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
        
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search item..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const selectedItem = items.find(
                      (item) => item.name === currentValue
                    );
                    if (selectedItem) {
                      onChange(selectedItem.id);
                    }
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboboxName;
