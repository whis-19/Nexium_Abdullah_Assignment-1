export async function GET(request) {
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" }
  ];

  return new Response(JSON.stringify(quotes), {
    headers: { "Content-Type": "application/json" }
  });
} 