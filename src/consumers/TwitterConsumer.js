import generateTwitterSocialActivity from '../generators/generateTwitterSocialActivity';

export default class TwitterConsumer {
  constructor (channel, consumerQueue, publishQueue) {
    this.channel = channel;
    this.consumerQueue = consumerQueue;
    this.publishQueue = publishQueue;
    this.setup();
  }

  setup () {
    this.onMessage = ::this.onMessage;
    this.channel.assertQueue(this.consumerQueue, { durable: true });
    this.channel.assertQueue(this.publishQueue, { durable: true });
  }

  start () {
    this.channel.consume(this.consumerQueue, this.onMessage);
  }

  onMessage (message) {
    const parsedMessage = JSON.parse(message);
    const socialActivity = generateTwitterSocialActivity(parsedMessage);
    if (socialActivity) {
      this.publishSocialActivity(socialActivity);
      this.channel.ack(message);
    }
  }

  publishSocialActivity (socialActivity) {
    const socialJson = JSON.stringify(socialActivity);
    this.channel.sendToQueue(this.publishQueue, new Buffer(socialJson));
  }
}
