import {
  PaginatedResponse,
  SearchResponse,
} from "@frontend/services/searchService";
import searchResponses from "./data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const pageSize = 10;
  const pageParam = searchParams.get("page") || "1";

  const page = parseInt(pageParam, 10);

  console.info("query ->", query);
  console.info("page ->", page);

  const filteredResponses = searchResponses.filter(
    (response) =>
      response.title.toLowerCase().includes(query) ||
      response.description.toLowerCase().includes(query)
  );

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredResponses.length / pageSize) : 0;

  console.info("totalPages ->", totalPages);

  const paginatedResponses = filteredResponses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const response: PaginatedResponse<SearchResponse> = {
    paging: {
      totalPages,
      page,
    },
    results: paginatedResponses,
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
  });
}
