'use client'

import SearchableSelect from '@/components/searchable-select'
import React from 'react'

const options = [
  { value: 'next', label: 'Next.js' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

export default function Home(props) {
  const [selectedValue, setSelectedValue] = React.useState<string>('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-2xl font-bold">可搜索的选择组件示例</h1>
      <SearchableSelect
        options={options}
        placeholder="选择一个框架"
        emptyMessage="没有找到框架。"
        onChange={(value: string) => {
          setSelectedValue(value)
          console.log('选中的值:', value)
        }}
      />
      {selectedValue && (
        <p className="mt-4">您选择了: {options.find(opt => opt.value === selectedValue)?.label}</p>
      )}
    </main>
  )
}