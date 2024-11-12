'use client'
import Image from 'next/image'
import { useState, useEffect, SetStateAction } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CommonWebsite, CountryCompanyID, SearchKeyWord, type WebSiteSettings } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import SearchableSelect, { Option } from './searchable-select'
import { Textarea } from "@/components/ui/textarea"
import { constructGoogleSearchURL, findCompanySuffixesByCountryName, joinWithOr } from '@/lib/utils'
import Link from 'next/link'



export default function AdvancedGoogleSearch() {

  // 起始数据
  const [websiteSettings, setWebsiteSettings] = useState<WebSiteSettings>()
  const [countryIDs, setCountryIDS] = useState<CountryCompanyID[]>()
  const [keyWords, setKeyWords] = useState<SearchKeyWord[]>()
  const [commonWebsite, setCommonWebsite] = useState<CommonWebsite[]>()

  // URL 构成参数
  const [isAddRegion, setIsaddRegion] = useState(false)
  const [region, setRegion] = useState("") //地区设置
  const [selectKeyWord, setSelectKeyWord] = useState("") // 搜索关键词
  const [fileType, setFileType] = useState("") //文件类型
  const [timeRange, setTimeRange] = useState("") // 时间
  const [searchQuery, setSearchQuery] = useState("") //搜索参数
  const [site, setSite] = useState("")  //地址
  const [exactPhrase, setExactPhrase] = useState("") //自定义匹配文字
  const [isExactPhare, setIsExactPhare] = useState<boolean>(true) //开启精确匹配
  const [isCustomExactPhare, setIsCustomExactPhare] = useState<boolean>(true) //开启精确匹配
  const [excludeWords, setExcludeWords] = useState("") // 排除词
  const [numericRange, setNumericRange] = useState({ min: "", max: "" }) //数值范围
  const [resultCount, setResultCount] = useState("100") // 搜索结果数字

  // 请求数据只请求一次
  const [httpOnce, setHttpOnce] = useState(true)

  async function fetchSetting() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/init`
    const res = await fetch(url)
    // 指定类型
    const settings = await res.json()
    // 网站设置
    setWebsiteSettings(settings["settings"])
    setCountryIDS([{
      id: "81839120301",
      countryEnglishName: "",
      countryChinaName: "空国家",
      countryAbbreviation: "",
      companySuffixes: "",
      countrySearchValue: "",
      position: "",
    }, ...settings["country"]])
    setKeyWords(settings["searchKeyWords"])
    setCommonWebsite([{
      id: "000001",
      url: "",
      name: "空网页",
    }, ...settings["commonWebsite"]])
  }
  useEffect(() => {
    if (httpOnce) {
      fetchSetting()
      setHttpOnce(false)
    }
    // const region_ = `${region && isAddRegion ? `region:${region} ` : ""}`
    // const fileType_ = `${fileType ? `filetype:${fileType} ` : ''}`
    // const timeRange_ = `${timeRange ? `after:${timeRange} ` : ""}`

    // const resultCount_ = `${resultCount ? `&num=${resultCount}` : ''}`
    // const excludeWords_ = `${excludeWords ? `-${excludeWords.split(' ').join(' -')} ` : ''}`
    // const numericRange_ = `${numericRange.min && numericRange.max ? `${numericRange.min}..${numericRange.max} ` : ''}`
    // const site_ = `${site ? `site:${site} ` : ''}`
    // 保留词
    let exactPhrase_ = selectKeyWord
    // 自定义搜索词, 如果必选就是非全匹配为空
    let customPhrase_ = isCustomExactPhare ? exactPhrase : ''
    let companyID_: string[] = []
    // 公司ID
    if (region !== "") {
      // @ts-ignore
      const suffixes = findCompanySuffixesByCountryName(countryIDs, region)
      companyID_ = joinWithOr(suffixes)
    }
    // if (selectKeyWord !== "") {
    //   exactPhrase_ = `${isExactPhare ? `"${selectKeyWord}" ` : " "}`
    // }
    if (isExactPhare && isCustomExactPhare) {
      // 如果关键词自定义就不用
      exactPhrase_ = selectKeyWord + " " + customPhrase_
      // setExactPhrase("")
    }
    // 第一种语法类别
    // const query = `${site_}${region_}${fileType_}${timeRange_}${exactPhrase_}${customPhrase_}${numericRange_}${excludeWords_}${companyID_}${resultCount_}`
    // setSearchQuery(query.trim())
    // 第二种google匹配

    const query = constructGoogleSearchURL({
      query: isCustomExactPhare ? "" : exactPhrase,
      exactPhrase: exactPhrase_,
      oneOfWords: companyID_,
      site: site,
      fileType: fileType,
      lastUpdate: "",        // 过去一年
      numRange: {
        min: numericRange.min,
        max: numericRange.max,
      }
    })
    setSearchQuery(query.trim())


  }, [region, resultCount, isAddRegion, isExactPhare, numericRange, excludeWords, site, searchQuery, fileType, exactPhrase, selectKeyWord, timeRange, isCustomExactPhare])


  const handleCheckboxChange = (checked: any) => {
    setIsExactPhare(checked);
  };
  const handleIsAddRegion = (checked: any) => {
    setIsaddRegion(checked);
  };
  const handleIsCustomExactPhare = (checked: any) => {
    setIsCustomExactPhare(checked);
  };

  const handleSearch = () => {
    // const baseQuery = searchQuery.split('&')[0] as string
    // const encodedQuery = encodeURIComponent(baseQuery)
    const resultCountParam = resultCount ? `&num=${resultCount}` : ''
    window.open(`${searchQuery}${resultCountParam}`, '_blank')
  }
  // 国家
  const countryOptions = countryIDs?.map((item: CountryCompanyID,) => {
    return { value: item.countryEnglishName, label: item.countryChinaName }
  }) as Option[]

  // 关键词
  const keyWordsOptions = keyWords?.map((item: SearchKeyWord) => {
    return { value: item.word, label: `💡${item.word.trim()}  \n🆚${item.toEnglishWord}`, }
  }) as Option[]

  // 关键词
  const commonWebsiteOptions = commonWebsite?.map((item: CommonWebsite) => {
    return { value: item.url, label: `🕸️${item.name}  ${item.url}` }
  }) as Option[]
  return (
    <Card className="w-full min-w-fit mx-auto">
      <CardHeader>

        <CardTitle className='flex flex-row items-center'>
          <Image src='/favicon.ico' alt="" width={40}
            height={40}
            alt="Picture of the author" ></Image>高级Google搜索
        </CardTitle>

        <CardDescription className='flex flex-row justify-between'>
          <p>
            选择搜索条件,生成高级搜索查询
          </p>
          <p className='text-neutral-900'>
            <Link href="/admin" >管理界面</Link>
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          {websiteSettings?.region && <div className="space-y-2 flex flex-col">
            <Label htmlFor="site" className='mb-2'>选择国家</Label>
            <SearchableSelect
              options={countryOptions}
              placeholder="选择国家"
              emptyMessage="没有找到这个国家。"
              onChange={(value: string) => {
                setRegion(value)
                console.log("region", region)
              }}
            />
          </div>}

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="site" className='mb-2'>预选搜索关键字</Label>
            <SearchableSelect
              options={keyWordsOptions}
              placeholder="选择关键字"
              emptyMessage="没有找到这个关键字。"
              onChange={(value: string) => {
                setSelectKeyWord(value)
                console.log("selectKeyWord", selectKeyWord)
              }}
            />
          </div>


          {websiteSettings?.filetype &&
            <Select onValueChange={setFileType}>
              <section className="space-y-2 flex flex-col">
                <Label htmlFor="site" className='mb-2'>文件类型搜索</Label>
                <SelectTrigger className='text-black font-bold'>
                  <SelectValue placeholder="选择文件类型" />
                </SelectTrigger>
              </section>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">DOC</SelectItem>
                <SelectItem value="xls">XLS</SelectItem>
                <SelectItem value="ppt">PPT</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="mp4">MP4</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          }

          {websiteSettings?.timestamp &&
            <Select onValueChange={setTimeRange}>
              <section className="space-y-2 flex flex-col">
                <Label htmlFor="site" className='mb-2'>时间范围筛选</Label>
                <SelectTrigger className='text-black font-bold'>
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
              </section>
              <SelectContent>
                <SelectItem value="d">过去24小时</SelectItem>
                <SelectItem value="w">过去一周</SelectItem>
                <SelectItem value="m">过去一月</SelectItem>
                <SelectItem value="y">过去一年</SelectItem>
              </SelectContent>
            </Select>
          }
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="site" className='mb-2'>网站内搜索</Label>
              <SearchableSelect
                options={commonWebsiteOptions}
                placeholder="网站"
                emptyMessage="没有找到这个网站。"
                onChange={(value: string) => {
                  setSite(value)
                }}
              />
            </div>

            {websiteSettings?.searchResultNum &&
              <div className="space-y-2">
                <Label htmlFor="resultCount">搜索结果数量 {resultCount}</Label>
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
            }


          </div>
          <div className="grid grid-cols-2 gap-4">
            {websiteSettings?.excluedWords &&
              <div className="space-y-2">
                <Label htmlFor="excludeWords">排除词</Label>
                <Input
                  id="excludeWords"
                  value={excludeWords}
                  onChange={(e) => setExcludeWords(e.target.value)}
                  placeholder="用空格分隔多个词"
                />
              </div>
            }

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {websiteSettings?.exactMatch &&
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isExactPhare} onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="exactPhrase">预选关键词精确匹配</Label>
            </div>

          }

          {websiteSettings?.exactMatch &&
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isCustomExactPhare} onCheckedChange={handleIsCustomExactPhare}
              />
              <Label htmlFor="exactPhrase">自定义搜索词精确匹配</Label>
            </div>
          }

          {websiteSettings?.language &&
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isAddRegion} onCheckedChange={handleIsAddRegion}
              />
              <Label htmlFor="exactPhrase">限定地区匹配</Label>
            </div>
          }

        </div>

        <div className="space-y-2">
          <Label htmlFor="exactPhraseWord">自定义搜索关键词</Label>
          <Input
            id="exactPhraseWord"
            value={exactPhrase}
            onChange={(e) => setExactPhrase(e.target.value)}
            placeholder="🔍 请输入搜索关键词"
          />
        </div>
        {
          websiteSettings?.showGeneratedGrammer &&
          <div className="space-y-2">
            <label htmlFor="searchQuery" className="text-sm font-medium">
              生成的搜索词:
            </label>
            <Textarea
              id="searchQuery"
              className='h-24'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="这里显示生成的搜索词"
            />
          </div>
        }

      </CardContent >
      <CardFooter>
        <Button className="w-full" onClick={handleSearch}>
          在Google中搜索
        </Button>
      </CardFooter>


    </Card >
  )
}