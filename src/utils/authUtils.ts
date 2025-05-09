
// Default credentials for different user types
export const defaultCredentials = {
  public: { email: "user@dharma.com", password: "password123" },
  police: { badgeNumber: "PL1234", password: "police123" },
  lawyer: { barNumber: "LW5678", password: "lawyer123" },
  judge: { registrationId: "JD9012", password: "judge123" },
  admin: { adminId: "AD3456", password: "admin123" }
};

// Simple authentication simulation
export const simulateAuth = (credentials: Record<string, string>, userType: string) => {
  const defaults = defaultCredentials[userType as keyof typeof defaultCredentials];
  
  // Check if all required credentials match
  const isAuthenticated = Object.keys(defaults).every(
    key => credentials[key] === defaults[key as keyof typeof defaults]
  );

  return {
    isAuthenticated,
    userData: isAuthenticated ? {
      id: `${userType}-123`,
      name: `${userType.charAt(0).toUpperCase() + userType.slice(1)} User`,
      role: userType,
      email: userType === 'public' ? defaults.email : `${userType}@dharma.com`
    } : null
  };
};
