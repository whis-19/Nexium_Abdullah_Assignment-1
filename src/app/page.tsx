'use client';
import { useState } from 'react';
import { QuoteForm } from '../components/QuoteForm';
import { QuoteList } from '../components/QuoteList';
import quotes from '../data/quotes';

const QuoteGenerator = () => {
  const [topic, setTopic] = useState('');
  const [quotesList, setQuotesList] = useState<typeof quotes>([]);

  const handleTopicSubmit = (submittedTopic: string) => {
    const filteredQuotes = quotes.filter(quote => quote.topic === submittedTopic);
    setQuotesList(filteredQuotes.slice(0, 3)); // Get only 3 quotes
    setTopic(submittedTopic);
  };

  return (
    <div>
      <h1>Quote Generator</h1>
      <QuoteForm onSubmit={handleTopicSubmit} />
      <QuoteList quotes={quotesList} />
    </div>
  );
};

export default QuoteGenerator;