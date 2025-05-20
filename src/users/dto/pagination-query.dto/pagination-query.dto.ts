// export class PaginationQueryDto {}

// // src/users/dto/pagination-query.dto.ts
// export class PaginationQueryDto {
//   page?: number = 1;
//   limit?: number = 10;
//   startDate?: string;
//   endDate?: string;
// }

// src/users/dto/pagination-query.dto.ts
import { IsOptional, IsNumber, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}