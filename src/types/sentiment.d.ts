declare module 'sentiment' {
  interface SentimentOptions {
    extras?: Record<string, number>;
  }

  interface SentimentResult {
    score: number;
    comparative: number;
    calculation: Array<Record<string, number>>;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }

  class Sentiment {
    constructor();
    analyze(phrase: string, options?: SentimentOptions): SentimentResult;
  }

  export = Sentiment;
}
