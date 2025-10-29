const normalizeBoolean = (value: string | boolean | undefined) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'
  }
  return false
}

export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  socketUrl: import.meta.env.VITE_SOCKET_URL ?? '',
  enableDevLogging: normalizeBoolean(import.meta.env.VITE_ENABLE_DEV_LOGGING),
}
