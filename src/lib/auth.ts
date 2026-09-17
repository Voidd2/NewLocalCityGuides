const TEST_ACCOUNTS = [
  {
    email: "test@yourlocalcityguide.com",
    password: "LeidenTest2026!",
    name: "Test Gebruiker",
    hasPaid: true,
    city: "leiden",
  },
  {
    email: "free@yourlocalcityguide.com",
    password: "FreeUser2026!",
    name: "Gratis Gebruiker",
    hasPaid: false,
    city: "leiden",
  },
];

export function validateLogin(email: string, password: string) {
  const account = TEST_ACCOUNTS.find(
    (a) => a.email === email && a.password === password
  );
  if (!account) return null;
  return {
    email: account.email,
    name: account.name,
    hasPaid: account.hasPaid,
    city: account.city,
  };
}

export const TEST_CREDENTIALS = {
  paid: { email: "test@yourlocalcityguide.com", password: "LeidenTest2026!" },
  free: { email: "free@yourlocalcityguide.com", password: "FreeUser2026!" },
};
