import type React from "react";
import {
  AirplaneTakeoff,
  Briefcase,
  Bus,
  Car,
  Crown,
  Heart,
  MapTrifold,
  Van,
} from "@phosphor-icons/react/dist/ssr";

export const serviceIcons: Record<string, React.ElementType> = {
  airport: AirplaneTakeoff,
  business: Briefcase,
  wedding: Heart,
  trips: MapTrifold,
  vip: Crown,
  sedan: Car,
  suv: Car,
  van: Van,
  coaster: Bus,
  bus: Bus,
};
