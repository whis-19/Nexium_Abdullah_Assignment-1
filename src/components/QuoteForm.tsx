"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuoteFormProps {
  onSubmit: (topic: string) => void;
}

export function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [topic, setTopic] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(topic.trim().toLowerCase());
      }}
      className="flex gap-2 mb-6 bg-white/20 p-4 rounded-lg shadow-md backdrop-blur-sm border border-white/30"
    >
      <Input
        placeholder="Enter a topic (e.g. force, hope, destiny, fear)"
        value={topic}
        onChange={e => setTopic((e as React.ChangeEvent<HTMLInputElement>).target.value)}
        className="flex-1 bg-white/80 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
      <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition">
        Get Quotes
      </Button>
    </form>
  );
}