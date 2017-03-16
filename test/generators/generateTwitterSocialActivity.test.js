import TwitterFixture from '../fixtures/twitter.json';
import TwitterTwoFixture from '../fixtures/twitterTwo.json';
import generateTwitterSocialActivity from '../../src/generators/generateTwitterSocialActivity';

describe('generateTwitterSocialActivity', () => {
  it('should generate an activity with fixure json', () => {
    const activity = generateTwitterSocialActivity(TwitterFixture);
    expect(activity.ActivityURL).toEqual('http://twitter.com/MckeonLutz/statuses/751152691611463680');
    expect(activity.AuthorID).toEqual('id:twitter.com:1386906962');
    expect(activity.AuthorPictureURL).toEqual('https://abs.twimg.com/sticky/default_profile_images/default_profile_0_normal.png');
    expect(activity.AuthorRealName).toEqual('MckeonLutz');
    expect(activity.AuthorUsername).toEqual('MckeonLutz');
    expect(activity.Network).toEqual('twitter');
    expect(activity.ID).toEqual('tag:search.twitter.com,2005:751152691611463680');
    expect(activity.BodyText).toEqual('RT @StylishRentals: Love this! \"Modern style Country Villa - Houses for Rent in Almoster\" @airbnb #Travelhttps://t.co/xJ479oYcx9');
  });

  // it('should check if the message has an image attatched to the object. If there is define URL with the URL of the image', () => {
  //   const activity = generateTwitterSocialActivity(TwitterFixture);
  //   expect(PostMedia.URL).toEqual('https://pbs.twimg.com/profile_images/746818199753129984/AiUdIFJe_normal.jpg');
  // });

  it('should generate an activity with second fixure json', () => {
    const activity = generateTwitterSocialActivity(TwitterTwoFixture);
    expect(activity.ActivityURL).toEqual('http://twitter.com/JenVento/statuses/794169597222064128');
    expect(activity.AuthorID).toEqual('id:twitter.com:18141787');
    expect(activity.AuthorPictureURL).toEqual('https://pbs.twimg.com/profile_images/378800000578979749/4ea77b8e30565b5bf1222b9042ae4e5f_normal.jpeg');
    expect(activity.AuthorRealName).toEqual('Jennifer Vento');
    expect(activity.AuthorUsername).toEqual('JenVento');
    expect(activity.Network).toEqual('twitter');
    expect(activity.ID).toEqual('tag:search.twitter.com,2005:794169597222064128');
    expect(activity.BodyText).toEqual('How women could vote Hillary Clinton into the White House https://t.co/jnFqk44nr4 #imwithher');
  });

  it('should returned undefined if missing id and body text', () => {
    const activity = generateTwitterSocialActivity({});
    expect(activity).toEqual(undefined);
  });

  it('should match snapshot on valid activity', () => {
    const activity = generateTwitterSocialActivity(TwitterFixture);
    expect(activity).toMatchSnapshot();
  });

});
