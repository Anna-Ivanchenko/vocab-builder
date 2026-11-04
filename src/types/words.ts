export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
}

export interface WordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface WordsQuery {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}

export interface WordBody {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface EditWordPayload {
  id: string;
  body: WordBody;
}

export interface DeleteWordResponse {
  message: string;
  id: string;
}

export interface Statistics {
  totalCount: number;
}