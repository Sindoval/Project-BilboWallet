// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';

export function sendEmail(email: string) {
  return {
    type: SEND_EMAIL,
    payload: email,
  };
}
