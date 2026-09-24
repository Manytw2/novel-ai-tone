export type Finding = { id: string; title: string; excerpt: string; note: string };
const rules = [
  { id: 'dash', title: '解释性破折号', re: /——/g, note: '该对照语料中，AI 重建文本使用更密。需结合上下文判断是否为必要停顿。' },
  { id: 'list', title: '顿号三项并列', re: /[\u4e00-\u9fa5]{1,8}、[\u4e00-\u9fa5]{1,8}、[\u4e00-\u9fa5]{1,8}/g, note: '并列本身正常；反复出现时可能显得整齐而机械。' },
  { id: 'subsequent', title: '“随后”衔接', re: /随后/g, note: '在这组小说对照中更常见于 AI 重建文本。' },
  { id: 'realize', title: '“意识到”直述', re: /意识到/g, note: '可能直接说明人物认知，值得检查是否有更自然的叙事承接。' },
  { id: 'therefore', title: '“由此”判断模板', re: /由此(?:联想|判断|推断|想到)/g, note: '提示推理过程的固定壳，需核查是否替代了具体情节。' },
  { id: 'colon', title: '总结式冒号', re: /(?:给出|作出|写下|梳理|抛出|宣布|得出)[^。！？\n]{0,8}(?:结论|总结|判断|答案|原因|核心|观点)[：:]/g, note: '叙述中先宣布总结再列内容，可能打断小说节奏。' },
];
export function analyze(text: string) {
  const findings: Finding[] = [];
  for (const rule of rules) for (const match of text.matchAll(rule.re)) {
    const i = match.index ?? 0;
    findings.push({ id: rule.id, title: rule.title, excerpt: text.slice(Math.max(0, i - 22), Math.min(text.length, i + match[0].length + 22)).replace(/\s+/g, ' ').trim(), note: rule.note });
    if (findings.length >= 30) break;
  }
  return { chars: [...text].filter(c => /[\u4e00-\u9fff]/.test(c)).length, findings: findings.slice(0, 30) };
}
