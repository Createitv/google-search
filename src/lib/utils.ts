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
export function joinWithOr(arr: string[] | undefined): string[] {
  if (arr === undefined) {
    return [""];
  }
  if (!Array.isArray(arr) || arr.length === 0) {
    return [""]; // 如果不是数组或数组为空，返回空字符串
  }
  arr.forEach((item) => {
    return item.trim();
  });
  // 使用 join 方法将数组元素用 ' OR ' 连接起来
  // return arr.join(" OR ");
  return arr;
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

interface GoogleSearchParams {
  query?: string; // 普通搜索词(as_q)
  exactPhrase?: string; // 精确匹配(as_epq)
  oneOfWords?: string[]; // OR搜索(as_oq)
  excludeWords?: string[]; // 排除词(as_eq)
  site?: string; // 站内搜索(as_sitesearch)
  fileType?: string; // 文件类型(as_filetype)
  language?: string; // 语言(lr)
  country?: string; // 地区(cr)
  lastUpdate?: string; // 时间范围(as_qdr)
  searchIn?: "any" | "title" | "url" | "links" | "text"; // 搜索位置(as_occt)
  numRange?: {
    // 数字范围
    min?: string; // 最小值(as_nlo)
    max?: string; // 最大值(as_nhi)
  };
}

export function constructGoogleSearchURL(params: GoogleSearchParams): string {
  const baseUrl = "https://www.google.com/search";
  const searchParams = new URLSearchParams();

  // 设置基础参数
  // searchParams.set("hl", "zh-CN"); // 默认使用中文界面

  // 添加搜索参数
  if (params.query) {
    searchParams.set("as_q", params.query);
  }

  if (params.exactPhrase) {
    searchParams.set("as_epq", params.exactPhrase);
  }

  if (params.oneOfWords?.length) {
    searchParams.set("as_oq", params.oneOfWords.join(" "));
  }

  if (params.excludeWords?.length) {
    searchParams.set("as_eq", params.excludeWords.join(" "));
  }

  if (params.site) {
    searchParams.set("as_sitesearch", params.site);
  }

  if (params.fileType) {
    searchParams.set("as_filetype", params.fileType);
  }

  if (params.language) {
    searchParams.set("lr", `lang_${params.language}`);
  }

  if (params.country) {
    searchParams.set("cr", `country${params.country.toUpperCase()}`);
  }

  if (params.lastUpdate) {
    searchParams.set("as_qdr", params.lastUpdate);
  }

  if (params.searchIn) {
    searchParams.set("as_occt", params.searchIn);
  }

  if (params.numRange) {
    if (params.numRange.min !== undefined) {
      searchParams.set("as_nlo", params.numRange.min);
    }
    if (params.numRange.max !== undefined) {
      searchParams.set("as_nhi", params.numRange.max);
    }
  }

  return `${baseUrl}?${searchParams.toString()}`;
}

// 使用示例
function example() {
  const searchParams: GoogleSearchParams = {
    query: "机器学习",
    exactPhrase: "深度学习",
    oneOfWords: ["python", "tensorflow"],
    excludeWords: ["教程"],
    site: "github.com",
    fileType: "pdf",
    lastUpdate: "y1", // 过去一年
    searchIn: "title",
    numRange: {
      min: "2020",
      max: "2024",
    },
  };

  const url = constructGoogleSearchURL(searchParams);
  console.log(url);
  return url;
}