# 小说机械味观察室

输入 80–6000 字中文小说片段，页面展示可定位的文字特征，并通过 Vercel AI Gateway 的 Jev 模型判断机械化文风程度和重复解释倾向。它观察文风，**不鉴定作者身份，也不把结果解释为 AI 写作概率**。

## 检测流程

1. 规则标出破折号、三项顿号并列、“随后”“意识到”“由此判断”等可定位的表层线索，展示原文摘录。
2. 服务端把片段交给 Jev，按明确标准选择低、中、高机械感，并判断重复解释倾向。
3. 读者根据原句和情节语境自行复核。没有规则命中也不等于没有机械味。

规则来自本地 `corpus/findings.md` 中对《诡秘之主》57 章的同章对照；该语料不随公开仓库发布。这是特定作品与特定 AI 重建流程的对照结果，不可直接当作所有中文小说的统计结论。通用中文写作研究参考 [Lieflat Less AI Tone](https://github.com/larashero3-dotcom/lieflat-less-ai-tone)，但本项目没有直接套用其全部特征。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

在 `.env.local` 设置 `AI_GATEWAY_API_KEY`。未设置时规则检测仍可使用，Jev 判断会显示“暂未启用”。密钥只在服务端读取。运行 `npm run build` 检查部署构建。

## Vercel 部署

1. 在 Vercel 中导入 GitHub 仓库 `Manytw2/novel-ai-tone`；框架选择 Next.js。
2. 在项目环境变量中设置 `AI_GATEWAY_API_KEY`，来源为 Vercel AI Gateway。
3. 部署后测试一段 80 字以上文本，确认结果页出现 Jev 判断。

GitHub 连接完成后，后续提交会触发预览或生产部署。公开页面的请求会消耗 AI Gateway 额度；正式对外分享前，建议在 Vercel 为接口设置流量限制。
