interface Quote {
  topic: string;
  text: string;
  author: string;
}

interface QuoteListProps {
  quotes: Quote[];
}

export function QuoteList({ quotes }: QuoteListProps) {
  if (quotes.length === 0) {
    return <div className="text-center text-gray-300 italic">No quotes found for this topic.</div>;
  }

  return (
    <ul className="space-y-6">
      {quotes.map((quote, idx) => (
        <li key={idx} className="bg-white/20 border border-white/30 rounded-lg shadow-md p-6 backdrop-blur-sm">
          <blockquote className="italic text-lg text-gray-100 mb-2">“{quote.text}”</blockquote>
          <div className="text-right mt-2 text-blue-200 font-semibold">- {quote.author}</div>
        </li>
      ))}
    </ul>
  );
}