import { formatEmail } from './helper';

describe('formatEmail', () => {
  it('should split email into subject and body', () => {
    const email = 'Subject: Hello! Body: Good day to you.';
    const expected = ['Hello!', 'Good day to you.'];
    const actual = formatEmail(email);
    expect(actual).toEqual(expected);
  });

  it('should handle missing subject', () => {
    const email = 'Body: Good day to you.';
    const expected = ['', 'Good day to you.'];
    const actual = formatEmail(email);
    expect(actual).toEqual(expected);
  });

  it('should handle missing body', () => {
    const email = 'Subject: Hello!';
    const expected = ['Hello!', undefined];
    const actual = formatEmail(email);
    expect(actual).toEqual(expected);
  });
});
