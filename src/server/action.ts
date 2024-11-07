import { SETTING_DB_ID } from "@/lib/constant";
import { db } from "./db";
import { NewProduct } from "@/components/editable-table";
import { CommonWebsite } from "@prisma/client";

// 获取设置缩写
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

// 删除常访问网页
export const deleteCommonWebsite = async (id: string) => {
  console.log("id delete", id);
  try {
    const res = await db.commonWebsite.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "ok",
      res,
    };
  } catch {
    return {
      code: 200,
      status: "error",
      id: "",
      name: "",
    };
  }
};

// 修改当前值
export const updateCommonWebsite = async (option: CommonWebsite) => {
  try {
    const res = await db.commonWebsite.update({
      where: {
        id: option.id,
      },
      data: {
        name: option.name,
        url: option.url,
      },
    });
    return {
      code: 200,
      status: "ok",
      res,
    };
  } catch {
    return {
      code: 200,
      status: "error",
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
