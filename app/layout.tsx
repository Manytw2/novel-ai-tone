import './style.css';
export const metadata = { title: '小说机械味观察室', description: '从可定位的文本特征观察小说的机械味' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }
