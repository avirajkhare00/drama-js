// This example demonstrates basic usage of drama-js

// In a real project, you would import the package like this:
// const drama = require('drama-js');
// But for local development, we'll use a relative path
const drama = require('../lib');

// Sample texts with varying levels of drama
const samples = [
  'Today is a beautiful day. The sun is shining and birds are singing.',
  'I\'m a bit disappointed with the results. It could have been better.',
  'This is quite annoying and frustrating. I don\'t like how they handled this situation.',
  'I am absolutely furious about this terrible betrayal! How could they do this to me?!',
  'I am absolutely outraged and furious! This is a complete disaster and betrayal! I hate everything about this terrible scandal!'
];

console.log('Drama Analysis Examples:\n');

// Analyze each sample text
samples.forEach((text, index) => {
  console.log(`Sample ${index + 1}: "${text}"`);
  
  // Simple drama check
  const hasDrama = drama.hasDrama(text);
  console.log(`Contains drama: ${hasDrama}`);
  
  // Get drama level
  const dramaLevel = drama.getDramaLevel(text);
  console.log(`Drama level: ${dramaLevel}`);
  
  // Get detailed analysis
  const analysis = drama.analyzeDrama(text);
  console.log('Detailed analysis:');
  console.log(`  Score: ${analysis.score}`);
  console.log(`  Comparative: ${analysis.comparative.toFixed(2)}`);
  console.log(`  Positive words: ${analysis.positiveWords.join(', ') || 'none'}`);
  console.log(`  Negative words: ${analysis.negativeWords.join(', ') || 'none'}`);
  
  console.log('---\n');
});

// Custom analyzer example
console.log('Custom Analyzer Example:');
const { DramaAnalyzer } = drama;

// Create a more sensitive analyzer
const sensitiveAnalyzer = new DramaAnalyzer({
  scoreThreshold: 1.0,
  comparativeThreshold: 0.1,
  negativeWordsThreshold: 1
});

const mildText = 'This is slightly disappointing.';
console.log(`Text: "${mildText}"`);

// Compare default vs custom analyzer
const defaultResult = drama.hasDrama(mildText);
const customResult = sensitiveAnalyzer.hasDrama(mildText);

console.log(`Default analyzer detects drama: ${defaultResult}`);
console.log(`Custom (sensitive) analyzer detects drama: ${customResult}`);
