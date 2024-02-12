// Uncomment the code below and write your tests

import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(1000);
    expect(myAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      getBankAccount(1000).withdraw(1200);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sender = getBankAccount(1000);
    const receiver = getBankAccount(100);
    expect(() => sender.transfer(2000, receiver)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const sender = getBankAccount(1000);
    expect(() => sender.transfer(200, sender)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositOperation = getBankAccount(1000).deposit(5300);
    expect(depositOperation.getBalance()).toBe(6300);
  });

  test('should withdraw money', () => {
    const withdrawOperation = getBankAccount(1000).withdraw(300);
    expect(withdrawOperation.getBalance()).toBe(700);
  });

  test('should transfer money', () => {
    const sender = getBankAccount(1000);
    const receiver = getBankAccount(100);
    sender.transfer(200, receiver);
    expect(sender.getBalance()).toBe(800);
    expect(receiver.getBalance()).toBe(300);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    // const account = new BankAccount(100);
    // const balance = await account.fetchBalance();
    // expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = getBankAccount(90);
    const newBalance = 80;
    jest.spyOn(balance, 'fetchBalance').mockResolvedValue(newBalance);
    await balance.synchronizeBalance();
    expect(balance.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = getBankAccount(50);
    jest.spyOn(balance, 'fetchBalance').mockResolvedValue(null);
    await expect(balance.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
