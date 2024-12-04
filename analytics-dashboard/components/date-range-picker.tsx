"use client"

import * as React from "react"
import { addDays, format, startOfDay, endOfDay, subDays } from "date-fns"
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DateRangePickerProps {
  date: DateRange | undefined
  onChange: (date: DateRange | undefined) => void
  className?: string
}

const presets = [
  {
    label: 'Today',
    getValue: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date())
    }),
  },
  {
    label: 'Last 7 days',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date())
    }),
  },
  {
    label: 'Last 15 days',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 14)),
      to: endOfDay(new Date())
    }),
  },
  {
    label: 'Last 30 days',
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date())
    }),
  },
]

export function DateRangePicker({
  date,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (newDate: DateRange | undefined) => {
    onChange(newDate)
    if (newDate?.from && newDate?.to) {
      setOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            Presets
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {presets.map((preset) => (
            <DropdownMenuItem
              key={preset.label}
              onClick={() => {
                onChange(preset.getValue())
              }}
            >
              {preset.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

