import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export interface Tag {
  id: string;
  name: string;
}


interface TagsMultiSelectProps {
  availableTags: Tag[]
  selectedTags: Tag[]
  onChange: (tags: Tag[]) => void
  placeholder?: string
}

export function TagsMultiSelect({
  availableTags,
  selectedTags,
  onChange,
  placeholder = "Select tags...",
}: TagsMultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleToggleTag = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      onChange(selectedTags.filter((t) => t.id !== tag.id))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  return (
    <div className="space-y-2 text-neutral-800">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              selectedTags.length === 0 && "text-muted-foreground"
            )}
          >
            {selectedTags.length > 0
              ? `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {availableTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  onSelect={() => handleToggleTag(tag)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{tag.name}</span>
                    {selectedTags.some((t) => t.id === tag.id) && (
                      <Check className="h-4 w-4 00 text-primary" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1 bg-primary-light"
            >
              {tag.name}
              <button
                onClick={() => handleToggleTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
