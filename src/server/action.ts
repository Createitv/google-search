import { SETTING_DB_ID } from "@/lib/constant";
import { db } from "./db";
import { CommonWebsite } from "@prisma/client";
import { NewProduct } from "@/components/editable-table";

export const getWebsiteSettings = async () => {
  const res = await db.webSiteSettings.findFirst({
    where: {
      id: SETTING_DB_ID,
    },
  });
  return res;
};

// 获取公司缩写
export const getCountryAbbIds = async () => {
  const res = await db.countryCompanyID.findMany();
  return res;
};

// 获取常访问网页
export const getCommonWebsite = async () => {
  const res = await db.commonWebsite.findMany({});
  return res;
};

// 添加常访问网页
export const addCommonWebsite = async (option: NewProduct) => {
  try {
    const res = await db.commonWebsite.create({
      data: {
        name: option.name,
        url: option.url,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res;
  } catch {
    return {
      id: "",
      name: "",
    };
  }
};

// 获取常用搜索关键字
export const getSearchKey = async () => {
  const res = await db.searchKeyWord.findMany();
  return res;
};
