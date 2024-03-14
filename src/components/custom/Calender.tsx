import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";

interface DatePickerInterface {
  label: string;
  initDate: Date;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export function DatePicker({
  label,
  initDate,
  date,
  setDate,
}: DatePickerInterface) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [open, setOpen] = useState(false);

  const setDateFunc = (e: any) =>{
    setDate(e);
    setOpen((open)=>!open); 
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDateFunc}
          initialFocus
          disabled={(date) =>
            date > yesterday ||
            date < initDate ||
            date.getDay() === 6 ||
            date.getDay() === 0
          }
        />
      </PopoverContent>
    </Popover>
  );
}
