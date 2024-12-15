export interface SearchResponse {
  title: string;
  url: string;
  description: string;
  userRole: string[];
}

export interface PaginatedResponse<TResult> {
  paging: {
    page: number;
    totalPages: number;
  };
  results: TResult[];
}

const searchService = {
  search: async (
    query: string,
    pageNumber = 1
  ): Promise<PaginatedResponse<SearchResponse>> => {
    const response = await fetch(
      `/api/search?query=${query}&page=${pageNumber}`
    );

    const data = (await response.json()) as PaginatedResponse<SearchResponse>;
    return data;
  },
} as const;

export default searchService;
