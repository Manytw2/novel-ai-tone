import { experimental_evaluate as evaluate } from 'ai';
import { analyze } from '@/lib/analyze';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (text.length < 80 || text.length > 6000) return Response.json({ error: '请输入 80 到 6000 字的小说片段。' }, { status: 400 });
  const base = analyze(text);
  if (!process.env.AI_GATEWAY_API_KEY) return Response.json({ ...base, jev: null, message: '尚未配置 Jev，当前显示规则观察结果。' });
  try {
    const result = await evaluate({
      model: 'typesafe-ai/jev',
      state: text,
      questions: {
        tone: { type: 'choice', instructions: '判断这段中文小说叙述的机械化文风程度。只评价文风，不推断作者身份或文本来源。', criteria: { low: '叙述自然，有具体动作、细节和变化，机械化痕迹少', medium: '有局部模板化、重复解释或过度整齐的叙述', high: '模板化、总结性或重复解释贯穿片段，明显影响阅读' } },
        repetition: { type: 'boolean', instructions: '这段小说是否反复用相近句式、解释或总结代替情节推进？' },
      },
    });
    return Response.json({ ...base, jev: { tone: result.answers.tone.choice, repetition: result.answers.repetition.probability } });
  } catch {
    return Response.json({ ...base, jev: null, message: 'Jev 暂时不可用，已显示规则观察结果。' });
  }
}
