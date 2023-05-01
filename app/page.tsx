'use client';

import { industries } from '@/utils/consts';
import { Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import useWriteEmail from '@/hooks/useWriteEmail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EmailCard from '@/components/email-card';

export default function IndexPage() {
  const { writeEmail, isLoading, isError, isStreaming, ...email } =
    useWriteEmail();
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <h1 className="text-center text-3xl font-bold">{siteConfig.name}</h1>
      <sub className="text-center text-sm">{siteConfig.description}</sub>
      <form className="mt-6" onSubmit={writeEmail}>
        <div className="mt-4 flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Select name="industry">
              <SelectTrigger>
                <SelectValue placeholder="Target industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="role"
              type="text"
              placeholder="What is the role of your lead?"
              maxLength={100}
              autoComplete="off"
            />
            <Input
              name="product"
              type="text"
              placeholder="Short description of your product"
              maxLength={100}
              autoComplete="off"
            />
            <Button
              className="min-w-[140px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Generate Email'}
            </Button>
          </div>
        </div>
      </form>
      <div className="my-4" />
      {isError && 'Something went wrong. Please try again.'}
      {!isError && isStreaming && email.body}
      {!isStreaming && !isError && email.body && email.subject && (
        <EmailCard {...email} />
      )}
    </section>
  );
}
