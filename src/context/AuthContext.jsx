import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Save user in localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  // SIGNUP
 function signup(newUser) {
  const users = JSON.parse(localStorage.getItem("users")) || []

  users.push(newUser)

  localStorage.setItem("users", JSON.stringify(users))
  setUser(newUser)
}
//Login
function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || []

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  )

  if (foundUser) {
    setUser(foundUser)
    return true
  }

  return false
}

  // LOGOUT
  function logout() {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}