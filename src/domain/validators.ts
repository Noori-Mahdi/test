import { TValidationResults } from "./type"

export const validateFormValues = (
  values: Record<string, string>
): TValidationResults => {
  const result: TValidationResults = {}

  Object.entries(values).forEach(([field, value]) => {
    if (field === 'mobile') {
      const phoneRegex = /^09\d{9}$/
      result[field] = phoneRegex.test(value)
        ? { type: true, message: null }
        : { type: false, message: 'فرمت شماره موبایل اشتباه است' }
    } else if (field === 'inviteCode') {
      const inviteCodeRegex = /^\d{7}$/
      result[field] = inviteCodeRegex.test(value)
        ? { type: true, message: null }
        : { type: false, message: 'فرمت کد معرف اشتباه است' }
    } else if (field === 'OTP') {
      const otpRegex = /^\d{1}$/
      result[field] = otpRegex.test(value)
        ? { type: true, message: null }
        : { type: false, message: 'کد وارد شده اشتباه است' }
    } else {
      result[field] = { type: true, message: null } // پیش‌فرض
    }
  })

  return result
}
