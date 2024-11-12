'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { constructWebSettingData } from '@/lib/utils'
import { WebSiteSettings } from '@prisma/client'
import React, { useEffect, useState } from 'react'

export default function AdminPage({ }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">修改页面功能开启设置</h1>
      <FeatureToggles></FeatureToggles>
    </div>
  )
}
interface Feature {
  id: string
  name: string
  enabled: boolean
}

const initialFeatures: Feature[] = []

export function FeatureToggles() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  // 起始数据
  const [websiteSettings, setWebsiteSettings] = useState<WebSiteSettings>()
  // 请求数据只请求一次
  const [httpOnce, setHttpOnce] = useState(true)

  useEffect(() => {
    async function fetchSetting() {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/website-setting`
      const res = await fetch(url)
      // 指定类型
      const settings = await res.json()
      // 网站设置
      const setRes = settings["settings"]
      setWebsiteSettings(setRes)
      // @ts-ignore
      const options = [
        {
          id: '1', name: '选择国家', enabled: setRes?.region as boolean,
        },
        {
          id: '2', name: '排除关键字', enabled: setRes?.excluedWords,
        },
        {
          id: '3', name: '文件类型搜索', enabled: setRes?.filetype,
        },
        {
          id: '4', name: '搜索结果数量', enabled: setRes?.searchResultNum,
        },
        {
          id: '5', name: '开启精确匹配', enabled: setRes?.exactMatch,
        },
        {
          id: '6', name: '开启限定区域匹配', enabled: setRes?.language,
        },
        {
          id: '7', name: '开启时间范围', enabled: setRes?.timestamp,
        },
        {
          id: '8', name: '禁止显示搜索语法', enabled: setRes?.showGeneratedGrammer,
        },
      ]
      // @ts-ignore
      setFeatures(options)
    }
    if (httpOnce) {
      fetchSetting()
      setHttpOnce(false)
    }
  }, [features])

  const handleToggle = (id: string) => {
    setFeatures(features.map(feature =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ))
  }
  const handleSave = async () => {
    // 这里模拟保存到数据库的操作
    console.log('Saving features:', constructWebSettingData(features))
    const httpRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
      method: "POST",
      body:
        JSON.stringify(constructWebSettingData(features))

    })
    const updataRes = await httpRes.json()
    if (updataRes.status === "ok") {
      // 显示保存成功的提示
      toast({
        title: "设置已保存",
        description: "您的功能开关设置已成功保存到数据库。",
        duration: 1300,
      })
    }
  }

  return (
    <div className="p-6 max-w-8xl mx-auto flex items-center flex-col">
      <h1 className="text-2xl font-bold mb-6">功能开关设置</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center justify-between space-x-2">
            <Label htmlFor={`switch-${feature.id}`} className="flex flex-col space-y-1">
              <span className='w-full'>{feature.name}</span>
              <span className="text-sm text-muted-foreground">
                {feature.enabled ? '已启用' : '已禁用'}
              </span>
            </Label>
            <Switch
              id={`switch-${feature.id}`}
              checked={feature.enabled}
              onCheckedChange={() => handleToggle(feature.id)}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} className="w-1/2 mb-4">
        保存设置
      </Button>
    </div>
  )
}