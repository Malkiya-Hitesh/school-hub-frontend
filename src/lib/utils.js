import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'






export function cn(...inputs) {
  return twMerge(clsx(inputs))
}





export function formatNumber(n, lang = 'en') {
  return new Intl.NumberFormat(lang === 'gu' ? 'gu-IN' : 'en-IN').format(n)
}





export function getSchoolName(name, lang) {
  return name[lang]
}



export function truncate(str, max = 60) {
  return str.length > max ? str.slice(0, max) + '…' : str
}


