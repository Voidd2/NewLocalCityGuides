const TEST_ACCOUNTS = process.env.NODE_ENV === "production" ? [] : [
  {
    email: "test@citywalkstories.com",
    password: "LeidenTest2026!",
    name: "Test Gebruiker",
    hasPaid: true,
    city: "leiden",
  },
  {
    email: "free@citywalkstories.com",
    password: "FreeUser2026!",
    name: "Gratis Gebruiker",
    hasPaid: false,
    city: "leiden",
  },
];

export function validateLogin(email: string, password: string) {
  if (process.env.NODE_ENV === "production") return null;
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
