// Simple test script to understand how the sentiment library works
const Sentiment = require('sentiment');

// Create a new instance of the sentiment analyzer
const sentiment = new Sentiment();

// Test with a simple sentence
const text = 'I am absolutely furious about this terrible betrayal!';
console.log('Testing sentiment with:', text);

// Call the sentiment analyze method
const result = sentiment.analyze(text);
console.log('Sentiment result:', JSON.stringify(result, null, 2));

// Test with custom lexicon
const extraLexicon = {
  'furious': -3,
  'betrayal': -3
};

const resultWithExtras = sentiment.analyze(text, { extras: extraLexicon });
console.log('Sentiment result with extras:', JSON.stringify(resultWithExtras, null, 2));

// Test with a neutral sentence
const neutralText = 'Today is Tuesday. The weather is partly cloudy.';
console.log('\nTesting neutral text:', neutralText);
const neutralResult = sentiment.analyze(neutralText);
console.log('Neutral sentiment result:', JSON.stringify(neutralResult, null, 2));
