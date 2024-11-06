'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'



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

const initialFeatures: Feature[] = [
  { id: '1', name: '夜间模式', enabled: false },
  { id: '2', name: '自动保存', enabled: true },
  { id: '3', name: '通知', enabled: false },
  { id: '4', name: '高级搜索', enabled: true },
  { id: '5', name: '数据分析', enabled: false },
  { id: '6', name: '多语言支持', enabled: true },
  { id: '7', name: '离线模式', enabled: false },
  { id: '8', name: '协作功能', enabled: true },
]

export function FeatureToggles() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)

  const handleToggle = (id: string) => {
    setFeatures(features.map(feature =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ))
  }

  const handleSave = () => {
    // 这里模拟保存到数据库的操作
    console.log('Saving features:', features)
    // 显示保存成功的提示
    toast({
      title: "设置已保存",
      description: "您的功能开关设置已成功保存到数据库。",
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex items-center flex-col">
      <h1 className="text-2xl font-bold mb-6">功能开关设置</h1>
      <div className="grid grid-cols-4 gap-6 mb-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center justify-between space-x-2">
            <Label htmlFor={`switch-${feature.id}`} className="flex flex-col space-y-1">
              <span>{feature.name}</span>
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
      <Button onClick={handleSave} className="w-1/2">
        保存设置
      </Button>
    </div>
  )
}