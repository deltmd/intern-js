import TwitterConsumer from '../../src/consumers/TwitterConsumer';
import TwitterFixture from '../fixtures/twitter.json';

describe('TwitterConsumer', () => {
  it('should assertQueue with durable', () => {
    const assertQueueMock = jest.fn();
    new TwitterConsumer({
      assertQueue: assertQueueMock,
    }, 'hello');
    expect(assertQueueMock).toBeCalled();
    const firstCall = assertQueueMock.mock.calls[0];
    expect(assertQueueMock).toBeCalledWith('hello', { durable: true });
  });


  it('should run consume with consumerQueue name on start', () => {
  });

  it('should run transform and not publish on failure', () => {
    const sendToQueueMock = jest.fn();
    const ackMock = jest.fn();
    const consumer = new TwitterConsumer({
      assertQueue: () => {},
      sendToQueue: sendToQueueMock,
      ack: ackMock,
    }, 'hello');

    consumer.onMessage("{}");
    expect(sendToQueueMock.mock.calls.length).toBe(0);
    expect(ackMock.mock.calls.length).toBe(0);
  });

  it('should run transform and not publish on success', () => {
    const sendToQueueMock = jest.fn();
    const ackMock = jest.fn();
    const consumer = new TwitterConsumer({
      assertQueue: () => {},
      sendToQueue: sendToQueueMock,
      ack: ackMock,
    }, 'hello');
    const rawJSON = JSON.stringify(TwitterFixture);
    consumer.onMessage(rawJSON);
    expect(sendToQueueMock).toBeCalled();
    expect(ackMock).toBeCalledWith(rawJSON);
  });
});
