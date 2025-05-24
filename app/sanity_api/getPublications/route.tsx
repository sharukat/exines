import { NextRequest, NextResponse } from 'next/server';
import { getJson } from "serpapi";

// Environment variable for API key
const serpApiParams = {
  engine: "google_scholar_author",
  author_id: "uSWqDhwAAAAJ",
  api_key: process.env.SERP_API_KEY as string,  // Ensure this key is available and casted correctly
};

// Export the GET function as an API route
export async function GET(req: NextRequest) {
  try {
    // Fetch articles data from SerpAPI
    const serpApiData = await new Promise((resolve, reject) => {
      getJson(serpApiParams, (json: { [key: string]: any }) => {
        if (json && json["articles"]) resolve(json["articles"]);
        else reject(new Error("Failed to fetch articles from SerpAPI"));
      });
    });

    // Sort articles by year in descending order
    const sortedArticles = (serpApiData as { year: string }[]).sort((a, b) => {
        return parseInt(b.year) - parseInt(a.year);
      });
      // Return the sorted articles in the response
    return NextResponse.json({ articles: sortedArticles });
    
  } catch (error) {
    // Handle any errors
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// Next.js dynamic settings
// export const dynamic = "force-dynamic";
// export const revalidate = 3600;
