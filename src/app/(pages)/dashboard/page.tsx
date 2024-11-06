"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import readXlsxFile, { CellValue } from 'read-excel-file'

function getNonNullElementsInRange<T>(array: Array<T | null>, start: number = 3): T[] {
  // 过滤掉所有为 null 的元素
  // 获取指定范围内的元素
  const result = array.slice(start, 12);
  const filteredArray = result.filter(item => item !== null) as T[];
  return filteredArray;
}

function WebSiteSettingsPage({ }) {
  // File.
  const handleOnChange = (event: any) => {
    const file = event.target.files[0];
    readXlsxFile(file).then((rows) => {
      const items = rows.slice(1)
      const z: { countryEnglishName: string; countryChinaName: string; countryAbbreviation: CellValue | undefined; countrySearchValue: string; companySuffixes: (string | number | boolean | DateConstructor)[]; "position:": CellValue }[] = []
      items.forEach(async item => {
        const insetData = {
          "countryEnglishName": item[0] as string,
          "countryChinaName": item[1] as string,
          "countryAbbreviation": item[2],
          "countrySearchValue": item[2] as string,
          "companySuffixes": getNonNullElementsInRange(item)!,
          "position:": item[item.length - 1]!,
        }
        z.push(insetData)
      })
      console.log("z", z)

      // `rows` is an array of rows
      // each row being an array of cells.
      // console.log("rows", rows)
    })
  }

  return (
    <div className="grid w-full max-w-sm flex justify-center items-center gap-1.5">
      <Label htmlFor="picture">文件上传</Label>
      <Input id="picture" type="file" onChange={handleOnChange} />
      <Button type="submit">Subscribe</Button>
    </div>
  )
}
export default WebSiteSettingsPage