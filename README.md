# drama-js

A JavaScript library to detect drama in text using sentiment analysis.

## Installation

```bash
npm install drama-js
```

## Usage

### Basic Usage

```javascript
const drama = require('drama-js');

// Check if text contains drama
const hasDrama = drama.hasDrama('I am absolutely furious about this betrayal!');
console.log(hasDrama); // true

// Get drama level
const dramaLevel = drama.getDramaLevel('This is quite annoying and frustrating.');
console.log(dramaLevel); // 'moderate'

// Get detailed analysis
const analysis = drama.analyzeDrama('I hate everything about this terrible situation!');
console.log(analysis);
/* Output:
{
  text: 'I hate everything about this terrible situation!',
  hasDrama: true,
  score: -5,
  comparative: -0.7142857142857143,
  positiveCount: 0,
  negativeCount: 2,
  positiveWords: [],
  negativeWords: ['hate', 'terrible'],
  dramaLevel: 'high'
}
*/
```

### Using the DramaAnalyzer Class

```javascript
const { DramaAnalyzer } = require('drama-js');

// Create a custom analyzer with different thresholds
const analyzer = new DramaAnalyzer({
  scoreThreshold: 1.0,        // Lower threshold for drama detection (default: 2.0)
  comparativeThreshold: 0.2,  // Lower threshold for comparative score (default: 0.3)
  negativeWordsThreshold: 1   // Fewer negative words needed (default: 2)
});

// Analyze text with custom thresholds
const result = analyzer.analyze('This is slightly disappointing.');
console.log(result.hasDrama); // true (with custom thresholds)
console.log(result.dramaLevel); // 'mild'

// Update thresholds dynamically
analyzer.updateThresholds({
  scoreThreshold: 3.0  // Make it less sensitive
});
```

### TypeScript Usage

```typescript
import { DramaAnalyzer, analyzeDrama, DramaAnalysisResult } from 'drama-js';

// Use the library with TypeScript
const result: DramaAnalysisResult = analyzeDrama('This is dramatic!');
console.log(result.dramaLevel);
```

## API Reference

### Functions

- `analyzeDrama(text: string): DramaAnalysisResult` - Analyze text for drama
- `hasDrama(text: string): boolean` - Check if text contains drama
- `getDramaLevel(text: string): 'none' | 'mild' | 'moderate' | 'high' | 'extreme'` - Get the drama level of text

### Classes

#### DramaAnalyzer

- `constructor(options?: DramaThresholds)` - Create a new analyzer with custom thresholds
- `analyze(text: string): DramaAnalysisResult` - Analyze text for drama
- `hasDrama(text: string): boolean` - Check if text contains drama
- `getDramaLevel(text: string): 'none' | 'mild' | 'moderate' | 'high' | 'extreme'` - Get drama level
- `updateThresholds(thresholds: DramaThresholds): void` - Update thresholds

### Interfaces

#### DramaThresholds

- `scoreThreshold?: number` - Minimum absolute score to consider text dramatic (default: 2.0)
- `comparativeThreshold?: number` - Minimum comparative score to consider text dramatic (default: 0.3)
- `negativeWordsThreshold?: number` - Minimum number of negative words to consider text dramatic (default: 2)

#### DramaAnalysisResult

- `text: string` - Original text that was analyzed
- `hasDrama: boolean` - Whether the text contains drama
- `score: number` - Drama score (higher absolute value means more dramatic)
- `comparative: number` - Comparative score (normalized by text length)
- `positiveCount: number` - Number of positive words found
- `negativeCount: number` - Number of negative words found
- `positiveWords: string[]` - List of positive words found
- `negativeWords: string[]` - List of negative words found
- `dramaLevel: 'none' | 'mild' | 'moderate' | 'high' | 'extreme'` - Drama intensity level

## How It Works

drama-js uses lexicon-based sentiment analysis (similar to VADER) to detect drama in text. It analyzes:

1. The presence of negative and positive words
2. The intensity of sentiment
3. The density of emotional words relative to text length

The library extends the base sentiment lexicon with drama-specific words to improve detection accuracy.

## Development and Contributing

### CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **Testing**: Runs automatically on all branches and pull requests to validate code changes
- **Publishing**: Automatically publishes to npm when a version tag is pushed

### Release Process

To release a new version:

1. Make sure all changes are committed and tests are passing
2. Run the release script with the new version number:
   ```bash
   ./scripts/release.sh 1.0.0
   ```
3. Push the commit and tag to GitHub:
   ```bash
   git push origin main
   git push origin v1.0.0
   ```
4. The GitHub Actions workflow will automatically publish the new version to npm

### NPM Token Setup

To enable automatic publishing, you need to add your NPM token as a GitHub secret:

1. Generate an NPM access token with publish permissions
2. Add it as a secret in your GitHub repository settings with the name `NPM_TOKEN`

## License

MIT
