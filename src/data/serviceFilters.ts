const EXCLUDED_SERVICE_IDS = new Set(["sedan", "suv", "van", "coaster", "bus"]);

export const isServiceExcludedFromNav = (serviceId: string) =>
  EXCLUDED_SERVICE_IDS.has(serviceId);

