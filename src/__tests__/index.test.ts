import { DramaAnalyzer, analyzeDrama, hasDrama, getDramaLevel } from '../index';

describe('DramaAnalyzer', () => {
  let analyzer: DramaAnalyzer;

  beforeEach(() => {
    analyzer = new DramaAnalyzer();
  });

  test('should detect high drama in text', () => {
    const text = 'I am absolutely furious about this terrible betrayal! How could they do this to me?!';
    const result = analyzer.analyze(text);
    
    expect(result.hasDrama).toBe(true);
    expect(result.dramaLevel).toBe('high');
    expect(result.negativeCount).toBeGreaterThan(0);
  });

  test('should detect moderate drama in text', () => {
    const text = 'This is quite annoying and frustrating. I don\'t like how they handled this situation.';
    const result = analyzer.analyze(text);
    
    expect(result.hasDrama).toBe(true);
    expect(result.negativeCount).toBeGreaterThan(0);
  });

  test('should detect no drama in neutral text', () => {
    const text = 'Today is Tuesday. The weather is partly cloudy with a high of 72 degrees.';
    const result = analyzer.analyze(text);
    
    expect(result.hasDrama).toBe(false);
    expect(result.dramaLevel).toBe('none');
  });

  test('should detect mild drama in slightly negative text', () => {
    const text = 'I\'m a bit disappointed with the results. It could have been better.';
    const result = analyzer.analyze(text);
    
    expect(result.dramaLevel).toBe('mild');
  });

  test('should detect extreme drama in very negative text', () => {
    const text = 'I am absolutely outraged and furious! This is a complete disaster and betrayal! I hate everything about this terrible scandal! The tension is unbearable and everyone is screaming and yelling!';
    const result = analyzer.analyze(text);
    
    expect(result.hasDrama).toBe(true);
    expect(result.dramaLevel).toBe('extreme');
    expect(result.negativeCount).toBeGreaterThan(3);
  });

  test('should handle empty input', () => {
    expect(() => analyzer.analyze('')).toThrow();
  });

  test('should allow threshold customization', () => {
    const customAnalyzer = new DramaAnalyzer({
      scoreThreshold: 1.0,
      comparativeThreshold: 0.2,
      negativeWordsThreshold: 1
    });
    
    const text = 'This is slightly disappointing.';
    const defaultResult = analyzer.analyze(text);
    const customResult = customAnalyzer.analyze(text);
    
    // Custom analyzer should be more sensitive to drama
    expect(customResult.hasDrama).toBe(true);
    
    // Update thresholds dynamically
    analyzer.updateThresholds({
      scoreThreshold: 10.0 // Use a much higher threshold to ensure it changes the result
    });
    
    const updatedResult = analyzer.analyze(text);
    expect(updatedResult.hasDrama).toBe(false); // With higher threshold, it should no longer detect drama
  });
});

describe('Utility functions', () => {
  test('analyzeDrama should return correct result', () => {
    const text = 'This is a dramatic crisis!';
    const result = analyzeDrama(text);
    
    expect(result.hasDrama).toBe(true);
    expect(result.text).toBe(text);
  });
  
  test('hasDrama should return boolean', () => {
    expect(hasDrama('This is a dramatic crisis!')).toBe(true);
    expect(hasDrama('Today is a nice day.')).toBe(false);
  });
  
  test('getDramaLevel should return correct level', () => {
    expect(getDramaLevel('This is a dramatic crisis!')).toBe('moderate');
    expect(getDramaLevel('Today is a nice day.')).toBe('none');
  });
});
