 "use client";

 import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 import { CaretDown } from "@phosphor-icons/react";

type ServiceItem = {
  id: string;
  title: string;
};

type ServicesDropdownProps = {
  locale: string;
  label: string;
  items: ServiceItem[];
};

export function ServicesDropdown({ locale, label, items }: ServicesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group inline-flex cursor-pointer items-center gap-1 hover:text-emerald-600"
          aria-haspopup="menu"
        >
          {label}
          <CaretDown
            size={14}
            weight="bold"
            className="transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/services`} className="cursor-pointer">
            {label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {items.map((service) => (
          <DropdownMenuItem asChild key={service.id}>
            <Link
              href={`/${locale}/services/${service.id}`}
              className="cursor-pointer"
            >
              {service.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
