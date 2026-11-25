/**
 * Validates an email address format after trimming leading/trailing whitespace.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates an Australian landline or mobile phone number (e.g. 04xx xxx xxx, 02 xxxx xxxx, +61 4xx xxx xxx).
 */
export function isValidAustralianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(\+?61|0)[2-578]\d{8}$/.test(cleaned);
}
