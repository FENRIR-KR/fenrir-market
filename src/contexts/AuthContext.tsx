"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (data: { email: string; password: string; name: string; phone: string }) => { success: boolean; message: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 로그인 상태 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("melchi-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = (data: { email: string; password: string; name: string; phone: string }) => {
    // 기존 회원 목록 가져오기
    const users = JSON.parse(localStorage.getItem("melchi-users") || "[]");

    // 이메일 중복 체크
    if (users.find((u: { email: string }) => u.email === data.email)) {
      return { success: false, message: "이미 가입된 이메일입니다." };
    }

    // 새 회원 생성
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("melchi-users", JSON.stringify(users));

    // 자동 로그인
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("melchi-user", JSON.stringify(userWithoutPassword));

    return { success: true, message: "회원가입이 완료되었습니다!" };
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("melchi-users") || "[]");
    const found = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }

    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    localStorage.setItem("melchi-user", JSON.stringify(userWithoutPassword));

    return { success: true, message: "로그인 성공!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("melchi-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
