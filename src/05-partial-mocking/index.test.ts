// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne).not.toHaveBeenCalled();
    expect(mockTwo).not.toHaveBeenCalled();
    expect(mockThree).not.toHaveBeenCalled();

    mockOne();
    mockTwo();
    mockThree();
  });

  test('unmockedFunction should log into console', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mockedModule = require('./index');

    const spyUnmockedFunction = jest.spyOn(mockedModule, 'unmockedFunction');
    mockedModule.unmockedFunction();
    expect(spyUnmockedFunction).toHaveBeenCalled();
    spyUnmockedFunction.mockRestore();
  });
});
