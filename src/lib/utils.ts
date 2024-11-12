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

// 重新构建函数
export function constructWebSettingData(
  items: { id: any; enabled: boolean }[],
) {
  const data = {
    region: false, // 假设"选择国家"对应的是region
    language: false, // 如果有语言选项，这里可以设置为true或false，但目前没有提供相关信息
    website: false, // 同样假设网站选项未启用
    searchResultNum: false,
    exactMatch: false,
    filetype: false,
    timestamp: false,
    excluedWords: false,
    showGeneratedGrammer: false,
  };

  items.forEach((item: { id: any; enabled: boolean }) => {
    switch (item.id) {
      case "1":
        data.region = item.enabled;
        break;
      case "2":
        data.excluedWords = item.enabled;
        break;
      case "3":
        data.filetype = item.enabled;
        break;
      case "4":
        data.searchResultNum = item.enabled;
        break;
      case "5":
        data.exactMatch = item.enabled;
        break;
      case "6":
        data.language = item.enabled;
        break;
      case "7":
        data.timestamp = item.enabled;
        break;
      case "8":
        data.showGeneratedGrammer = !item.enabled; // 注意这里取反，因为配置中是禁止显示
        break;
      default:
        break;
    }
  });

  return data;
}
