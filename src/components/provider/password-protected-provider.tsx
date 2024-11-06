'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

interface PasswordProtectedContextType {
  isAuthenticated: boolean
  authenticate: (password: string) => boolean
}

const PasswordProtectedContext = createContext<PasswordProtectedContextType | undefined>(undefined)

interface PasswordProtectedProviderProps {
  children: ReactNode
  correctPassword: string
  cookieName?: string
  cookieExpiry?: number
}

const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, 'secret_key').toString()
}

const decryptPassword = (encryptedPassword: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secret_key')
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const PasswordProtectedProvider: React.FC<PasswordProtectedProviderProps> = ({
  children,
  correctPassword,
  cookieName = 'auth_cookie',
  cookieExpiry = 7 // 7 days
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const storedCookie = Cookies.get(cookieName)
    if (storedCookie) {
      const decryptedPassword = decryptPassword(storedCookie)
      if (decryptedPassword === correctPassword) {
        setIsAuthenticated(true)
      }
    }
  }, [cookieName, correctPassword])

  const authenticate = (inputPassword: string) => {
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true)
      const encryptedPassword = encryptPassword(inputPassword)
      Cookies.set(cookieName, encryptedPassword, { expires: cookieExpiry })
      return true
    }
    setError('密码错误，请重试。')
    return false
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>密码保护</CardTitle>
            <CardDescription>请输入密码以访问受保护的内容。</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault()
              authenticate(password)
            }}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="password"
                    type="password"
                    placeholder="输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => authenticate(password)}>提交</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <PasswordProtectedContext.Provider value={{ isAuthenticated, authenticate }}>
      {children}
    </PasswordProtectedContext.Provider>
  )
}

export const usePasswordProtected = () => {
  const context = useContext(PasswordProtectedContext)
  if (context === undefined) {
    throw new Error('usePasswordProtected must be used within a PasswordProtectedProvider')
  }
  return context
}