'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';


const NAV: { href: string; label: string; }[] = [
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/career', label: 'Career' }
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();
    const isActive = (href: string) => (href === '/admin' ? pathname === href : pathname.startsWith(href));

    return (
        <div className="flex h-full flex-col">
            <Link
                href="/admin"
                className="flex items-center gap-3 px-6 py-6 font-serif text-xl text-white"
                onClick={onNavigate}
            >
                <span>Soil & Structure</span>

                <span className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70">
                    Admin
                </span>
            </Link>
            <nav className="flex-1 space-y-1 px-3">
                {NAV.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
                            isActive(item.href) ? 'bg-white/10 font-medium text-white' : 'text-stone-400 hover:bg-white/5 hover:text-white',
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <Link href={'/'}><Button variant='outline-light' size='sm' className=' m-4'>Visit Site</Button></Link>
        </div>
    );
}
