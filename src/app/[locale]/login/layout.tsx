import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '600'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={roboto.className}>{children}</div>;
}
