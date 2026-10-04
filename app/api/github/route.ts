import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch("https://github.com/users/echo10000/contributions", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub responded with ${res.status}`);
    }

    const html = await res.text();
    const days: { date: string; level: number }[] = [];
    const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: parseInt(match[2], 10),
      });
    }

    const totalMatch = html.match(/([0-9,]+)\s+contributions/i);
    const totalCount = totalMatch ? totalMatch[1] : "158";

    // Take the last 182 days (approx 6 months, 26 weeks)
    const recentDays = days.slice(-182);

    return NextResponse.json({
      success: true,
      username: "echo10000",
      totalContributions: totalCount,
      days: recentDays,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch live GitHub contributions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch from GitHub",
      },
      { status: 500 }
    );
  }
}
