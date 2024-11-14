import { CarBrands } from "./enums/car-brands.enum";
import { CarTypes } from "./enums/car-types.enum";
import { FuelType } from "./enums/fuel-type.enum";
import { SortDirection } from "./enums/sortDirection.enum";
import { Transmission } from "./enums/transmission.enum";

export interface SearchQueryParams{
    searchTerm?: string,
    brand?: CarBrands,
    model?: string,
    type?: CarTypes,
    minYear?: number,
    maxDistance?: number,
    minEnginePower?: number,
    transmission?: Transmission,
    isNew?: boolean | undefined,
    page?: number,
    pageSize?: number,
    sortBy?: string,
    sortDirection?: SortDirection,
    fuelType?:FuelType
}
