// localStorage-based auth service.
// Accepts login(form) or login(email, password)

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

const authService = {
  // Register new user (expects object { name, email, password })
  register(user) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const exists = users.find((u) => u.email === user.email);
    if (exists) throw new Error("User already exists");
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Login — accepts either:
  // - login({ email, password })
  // - login(email, password)
  login(emailOrObj, password) {
    
    let email;
    if (typeof emailOrObj === "object" && emailOrObj !== null) {
      email = emailOrObj.email;
      password = emailOrObj.password;
    } else {
      email = emailOrObj; // first param is email string
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  },

  // Logout user
  logout() {
    localStorage.removeItem(CURRENT_KEY);
  },

  // Return logged-in user is object or null
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_KEY));
  },

  // Update user information
  updateUser(updatedUser) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const idx = users.findIndex((u) => u.email === updatedUser.email);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_KEY, JSON.stringify(updatedUser));
    }
  },
};

export default authService;
