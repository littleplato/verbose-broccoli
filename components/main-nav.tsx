import * as React from 'react';
import Link from 'next/link';
import { AlignLeft } from 'lucide-react';
import { NavItem } from '@/types/nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger>
            <AlignLeft className="mr-2 h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent align="start">
            {items?.length ? (
              <nav className="gap-6 sm:flex">
                {items?.map(
                  (item, index) =>
                    item.href && (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          'flex items-center text-lg font-semibold text-muted-foreground sm:text-sm',
                          item.disabled && 'cursor-not-allowed opacity-80'
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                )}
              </nav>
            ) : null}
          </PopoverContent>
        </Popover>
      </div>
      {/* <Link href="/" className="hidden items-center space-x-2 sm:flex">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link> */}
      {items?.length ? (
        <nav className="hidden gap-6 sm:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-muted-foreground sm:text-sm',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
