const subjectLength = 9;

export const formatEmail = (email: string) => {
  const res = email.split('\n');
  const subject = res[0].substring(subjectLength, res[0].length);
  const body = email.substring(
    subject.length + subjectLength + 2,
    email.length
  );
  return [subject, body];
};
