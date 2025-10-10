import { info, warn, error } from './logger';

describe('Logger', () => {
  it('should call console.info for info', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation(() => {});
    info('test info');
    const callArgs = spy.mock.calls[0];
    expect(callArgs[0]).toMatch(/INFO: test info$/);
    spy.mockRestore();
  });

  it('should call console.warn for warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    warn('test warn');
    const callArgs = spy.mock.calls[0];
    expect(callArgs[0]).toMatch(/WARN: test warn$/);
    spy.mockRestore();
  });

  it('should call console.error for error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    error('test error');
    const callArgs = spy.mock.calls[0];
    expect(callArgs[0]).toMatch(/ERROR: test error$/);
    expect(typeof callArgs[1]).toBe('object');
    spy.mockRestore();
  });
});
