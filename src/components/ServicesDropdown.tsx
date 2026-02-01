"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
         className="cursor-pointer hover:text-emerald-600"
          aria-haspopup="menu"
        >
          {label}
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
