import { SETTING_DB_ID } from "@/lib/constant";
import { db } from "./db";

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
  const res = await db.commonWebsite.findMany();
  return res;
};

// 获取常用搜索关键字
export const getSearchKey = async () => {
  const res = await db.searchKeyWord.findMany();
  return res;
};
