// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 20;
  const b = 2;

  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(22);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Substract });
    expect(result).toBe(18);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(40);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(result).toBe(400);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 'invalid', b, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidInput = { a: 'invalid', b, action: 'invalid' };
    const result = simpleCalculator(invalidInput);
    expect(result).toBeNull();
  });
});
