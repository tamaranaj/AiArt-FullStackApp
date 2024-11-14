import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class BackfillCarsDto {
  @ApiPropertyOptional({
    description: 'Number of cars to backfill',
    example: 50,
    default: 50,
  })
  @IsOptional()
  count?: number = 50;

  @ApiPropertyOptional({
    description: 'User ids to backfill cars for',
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsOptional()
  @IsString({ each: true })
  userIds?: string[];
}
