export const formatEmail = (email: string) => {
  const res = email.split('Body:');
  const subject = res[0].replace('Subject:', '').trim();
  const body = res[1]?.trim();
  return [subject, body];
};
