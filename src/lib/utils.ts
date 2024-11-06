import { CountryCompanyID } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function omitProperty<T extends object, K extends keyof T>(
  obj: T,
  property: K,
): Omit<T, K> {
  const { [property]: _, ...rest } = obj;
  return rest;
}

// 搜索语法 OR
export function joinWithOr(arr: string[] | undefined): string {
  if (arr === undefined) {
    return "";
  }
  if (!Array.isArray(arr) || arr.length === 0) {
    return ""; // 如果不是数组或数组为空，返回空字符串
  }
  arr.forEach((item) => {
    return item.trim();
  });
  // 使用 join 方法将数组元素用 ' OR ' 连接起来
  return arr.join(" OR ");
}

export function findCompanySuffixesByCountryName(
  countries: CountryCompanyID[],
  countryName: string,
): string[] | undefined {
  const country = countries.find((c) => c.countryEnglishName === countryName);
  return country ? country.companySuffixes : undefined;
}
