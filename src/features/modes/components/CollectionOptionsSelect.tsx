"use client";

import List from "~/components/List";
import { Select } from "~/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "~/components/ui/select";
import useModes from "~/hooks/useModes";
import { COLLECTION_OPTIONS } from "../data/collectionOptions";

const CollectionOptionsSelect: React.FC<
  Omit<React.ComponentPropsWithoutRef<typeof Select>, "value" | "onValueChange">
> = ({ ...props }) => {
  const { collection, setMode } = useModes();

  return (
    <Select
      {...props}
      value={collection}
      onValueChange={val => {
        setMode({ collection: val });
      }}
    >
      <SelectTrigger className="w-[200px]">
        {COLLECTION_OPTIONS.find(option => option.value === collection)?.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Collection</SelectLabel>
          <List of={COLLECTION_OPTIONS}>
            {option => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-3">
                  {option.icon}
                  {option.label}
                </span>
              </SelectItem>
            )}
          </List>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CollectionOptionsSelect;
