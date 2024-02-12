import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutMock).toHaveBeenCalledWith(callback, timeout);
    setTimeoutMock.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalMock = jest.spyOn(global, 'setInterval');
    const interval = 1000;
    doStuffByInterval(callback, interval);
    expect(setIntervalMock).toHaveBeenCalledWith(callback, interval);
    setIntervalMock.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    joinMock.mockImplementation((...args: any[]) => args.join('/'));

    const pathToFile = 'test-file.txt';
    await readFileAsynchronously(pathToFile);
    expect(joinMock).toHaveBeenCalledWith(
      expect.stringContaining(process.cwd()),
      pathToFile,
    );

    joinMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const nonExistentFilePath = 'nonexistentfile.txt';
    const result = await readFileAsynchronously(nonExistentFilePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
