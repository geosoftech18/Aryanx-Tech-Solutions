"use client";

import { Badge } from "@/components/ui/badge";
import { X as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";


interface InputTagsProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pending, setPending] = React.useState("");

    // Add tag if comma or enter is pressed
    const addPending = () => {
      const trimmed = pending.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
      setPending("");
    };

    return (
      <div
        className={cn(
          "flex flex-wrap gap-2 rounded-md border border-input bg-white px-3 py-2 min-h-10 w-full items-center",
          className
        )}
      >
        {value.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {item}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-1 h-4 w-4 p-0"
              onClick={() => onChange(value.filter((i) => i !== item))}
              tabIndex={-1}
            >
              <XIcon className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
        <input
          className="flex-1 outline-none border-none bg-transparent placeholder:text-muted-foreground min-w-[120px]"
          value={pending}
          onChange={(e) => setPending(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addPending();
            } else if (
              e.key === "Backspace" &&
              pending.length === 0 &&
              value.length > 0
            ) {
              // Remove last tag if backspace pressed on empty input
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={addPending}
          placeholder={
            props.placeholder || "Add a skill and press Enter or comma"
          }
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputTags.displayName = "InputTags";

export default InputTags;
