import { useEffect, useState } from 'react'

export function useCanAuthenticate() {
  const searchParamsCanAuthenticate = readSearchParamsCanAuthenticate()

  const [canAuthenticate] = useState(
    searchParamsCanAuthenticate || readLocalStorageCanAuthenticate(),
  )

  useEffect(() => {
    if (searchParamsCanAuthenticate) {
      writeLocalStorageCanAuthenticate()
    }
  }, [searchParamsCanAuthenticate])

  return canAuthenticate
}

function readSearchParamsCanAuthenticate() {
  try {
    const params = new URLSearchParams(window.location.search)
    const value = params.get('auth')
    return value === 'true' || value === ''
  } catch {
    return false
  }
}

function readLocalStorageCanAuthenticate() {
  try {
    const value = localStorage.getItem('canAuthenticate')
    return value === 'true'
  } catch {
    return false
  }
}

function writeLocalStorageCanAuthenticate() {
  try {
    localStorage.setItem('canAuthenticate', 'true')
  } catch {}
}
