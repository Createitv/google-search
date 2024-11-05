import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function WebsiteDirectory() {
  return (
    <div className="container mx-auto p-4 space-y-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold text-center mb-8">常用网站链接</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">搜索引擎和常用工具</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="text-center hover:text-primary transition-colors">Google</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">谷歌翻译</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">每日汇率</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">维基百科</Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">社交媒体</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="text-center hover:text-primary transition-colors">Youtube</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Linkedin</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">WhatsAPP</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Facebook</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Instagram</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Pinterest</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Twitter</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Quora</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Reddit</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Grammarly</Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">AI工具</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="text-center hover:text-primary transition-colors">ChatGPT</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Claude</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Bard</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Kimi</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Perplexity</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Midjourney</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Ideogram</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">可灵</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">AI工具合集</Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">商业与市场研究</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="text-center hover:text-primary transition-colors">全球企业数据库</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">国家商务局咨询查询</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">美国关税</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">海关编码</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">商标查询</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">全球市场调研</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">原材料价格</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">时光机</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">各国展会</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">各国节假日</Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg">其他工具</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="text-center hover:text-primary transition-colors">查海运费</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">查快递</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">接码平台</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">全球邮编</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Whois Lookup</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">找关键词</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">SEO工具</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">公共运输</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">装柜计算</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">潘通色号</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">Canva</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">背景移除</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">翻页目录册</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">PDF全能编辑器</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">找邮箱</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">邮箱验证</Link>
          <Link href="#" className="text-center hover:text-primary transition-colors">全球时间</Link>
        </CardContent>
      </Card>
    </div>
  )
}