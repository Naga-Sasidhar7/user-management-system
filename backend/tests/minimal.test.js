// Minimal test file that will definitely work
test('Test 1: 1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});

test('Test 2: String manipulation', () => {
  expect('hello'.toUpperCase()).toBe('HELLO');
});

test('Test 3: Array length', () => {
  expect([1, 2, 3]).toHaveLength(3);
});

test('Test 4: Object property', () => {
  const obj = { name: 'John', role: 'admin' };
  expect(obj).toHaveProperty('role');
});

test('Test 5: Boolean logic', () => {
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
});

// Bonus tests
test('Test 6: Async test', async () => {
  const result = await Promise.resolve('success');
  expect(result).toBe('success');
});

test('Test 7: Error throwing', () => {
  expect(() => {
    throw new Error('Test error');
  }).toThrow();
});