import { useState } from 'react'
import { useAuth } from '@bonfire/core'

export function useLoginViewModel() {
  const { session, login, logout } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      await login('credentials', { username, password })
      window.location.href = '/'
    } catch (err: any) {
      console.error('[Login Form] Auth failed:', err)
      setErrorMessage('Usuário ou senha inválidos.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    session,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    errorMessage,
    handleSubmit,
    logout,
  }
}
