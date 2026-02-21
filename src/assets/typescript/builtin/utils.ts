
export function secureRandomString(length: number = 8): string{
  const Chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const Bytes = new Uint8Array(length)

  crypto.getRandomValues(Bytes)

  return Array.from(Bytes, b => Chars[b % Chars.length]).join('')
}