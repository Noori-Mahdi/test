export function maskMiddleOfPhone(phone: string): string {
  return phone.replace(/^(\d{4})\d{3}(\d{4})$/, '$1***$2')
}
