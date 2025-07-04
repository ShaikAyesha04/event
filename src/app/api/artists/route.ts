// ✅ USE RELATIVE PATH
import { artists } from "../../../artists";






export const dynamic = "force-dynamic"; // needed for App Router API revalidations

export async function GET() {
  const normalized = artists.map((a) => ({
    ...a,
    categories: [a.category],     // Convert string to array
    feeRange: a.price,            // Match your frontend keys
    
 // Add empty array if not present
  }));

  return Response.json(normalized);
}
