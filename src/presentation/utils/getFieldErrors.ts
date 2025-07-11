export const getFieldErrors = (
  error: any,
  fields: string[]
): Record<string, string | null> => {
  console.log(error)
  const safeErrors = error?.response?.data?.errors
  if (!safeErrors || typeof safeErrors !== 'object') return {}

  const result: Record<string, string | null> = {}

  fields.forEach((field) => {
    result[field] = safeErrors[field]?.[0] || null
  })

  return result
}
