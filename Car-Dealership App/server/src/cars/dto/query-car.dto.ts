import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SortDirection } from '../../common/types/sort-direction.enum';
import { Transform, Type } from 'class-transformer';

export class QueryCarDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search term to filter cars by description, brand, model',
  })
  searchTerm?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter cars by brand',
  })
  brand?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter cars by model',
  })
  model?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter cars by type',
  })
  type?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter cars newer than this year',
  })
  minYear?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter cars by with less KM than this distance',
  })
  maxDistance?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter cars with more engine power than this',
  })
  minEnginePower?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter cars by transmission',
  })
  transmission?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filter cars by fuel type',
  })
  fuelType?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : undefined,
  )
  @ApiPropertyOptional({
    description:
      'Filter cars by if they are new or used. True for new, false for used, undefined for all',
  })
  isNew?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number',
    example: 0,
    default: 0,
  })
  page?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page size',
    example: 10,
    default: 10,
  })
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Sort by',
    type: 'name' || 'price' || 'createdAt' || 'year',
  })
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(SortDirection)
  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: SortDirection,
  })
  sortDirection?: SortDirection = SortDirection.Desc;
}
