import { Market } from './market';

// ! Swagger Doc is wrong
export interface GetManyMarketResponseDto {
  data: Market[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

// export type GetManyMarketResponseDto = Market[];