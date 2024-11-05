'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function AdvancedGoogleSearch() {
  const [language, setLanguage] = useState("")
  const [region, setRegion] = useState("")
  const [fileType, setFileType] = useState("")
  const [timeRange, setTimeRange] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [site, setSite] = useState("")
  const [exactPhrase, setExactPhrase] = useState("")
  const [excludeWords, setExcludeWords] = useState("")
  const [numericRange, setNumericRange] = useState({ min: "", max: "" })
  const [resultCount, setResultCount] = useState("")

  useEffect(() => {
    const query = `${language ? `lang:${language} ` : ''}${region ? `region:${region} ` : ''}${fileType ? `filetype:${fileType} ` : ''}${timeRange ? `after:${timeRange} ` : ''}${site ? `site:${site} ` : ''}${exactPhrase ? `"${exactPhrase}" ` : ''}${excludeWords ? `-${excludeWords.split(' ').join(' -')} ` : ''}${numericRange.min && numericRange.max ? `${numericRange.min}..${numericRange.max} ` : ''}${resultCount ? `&num=${resultCount}` : ''}`
    setSearchQuery(query.trim())
  }, [language, region, fileType, timeRange, site, exactPhrase, excludeWords, numericRange, resultCount])

  const handleSearch = () => {
    const baseQuery = searchQuery.split('&')[0] as string
    const encodedQuery = encodeURIComponent(baseQuery)
    const resultCountParam = resultCount ? `&num=${resultCount}` : ''
    window.open(`https://www.google.com/search?q=${encodedQuery}${resultCountParam}`, '_blank')
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>高级Google搜索</CardTitle>
        <CardDescription>选择搜索条件,生成高级搜索查询</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="选择语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zh-CN">中文</SelectItem>
              <SelectItem value="en">英语</SelectItem>
              <SelectItem value="ja">日语</SelectItem>
              <SelectItem value="ko">韩语</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="选择地区" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CN">中国</SelectItem>
              <SelectItem value="US">美国</SelectItem>
              <SelectItem value="JP">日本</SelectItem>
              <SelectItem value="KR">韩国</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setFileType}>
            <SelectTrigger>
              <SelectValue placeholder="选择文件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">DOC</SelectItem>
              <SelectItem value="xls">XLS</SelectItem>
              <SelectItem value="ppt">PPT</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="d">过去24小时</SelectItem>
              <SelectItem value="w">过去一周</SelectItem>
              <SelectItem value="m">过去一月</SelectItem>
              <SelectItem value="y">过去一年</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site">网站内搜索</Label>
              <Input
                id="site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="例如: wikipedia.org"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exactPhrase">精确匹配短语</Label>
              <Input
                id="exactPhrase"
                value={exactPhrase}
                onChange={(e) => setExactPhrase(e.target.value)}
                placeholder="用引号括起来的短语"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="excludeWords">排除词</Label>
              <Input
                id="excludeWords"
                value={excludeWords}
                onChange={(e) => setExcludeWords(e.target.value)}
                placeholder="用空格分隔多个词"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numericRange">数字范围</Label>
              <div className="flex space-x-2">
                <Input
                  id="numericRangeMin"
                  value={numericRange.min}
                  onChange={(e) => setNumericRange(prev => ({ ...prev, min: e.target.value }))}
                  placeholder="最小值"
                />
                <Input
                  id="numericRangeMax"
                  value={numericRange.max}
                  onChange={(e) => setNumericRange(prev => ({ ...prev, max: e.target.value }))}
                  placeholder="最大值"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="resultCount">搜索结果数量</Label>
            <Select onValueChange={setResultCount}>
              <SelectTrigger>
                <SelectValue placeholder="选择结果数量" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="searchQuery" className="text-sm font-medium">
            生成的搜索词:
          </label>
          <Input
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="这里显示生成的搜索词"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSearch}>
          在Google中搜索
        </Button>
      </CardFooter>
    </Card>
  )
}