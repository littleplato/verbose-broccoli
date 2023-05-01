import React, { useState } from 'react';
import Image from 'next/image';
import { capitaliseFirstLetter } from '@/utils/utils';
import { Minus, Plus } from 'lucide-react';
import { EmailPrompt } from '@/types/email';
import { Story } from '@/types/story';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

type Props = {
  subject: string;
  body: string;
  params: EmailPrompt;
  url: string;
};

export default function EmailCard(email: Props) {
  const [isSaved, setIsSaved] = useState(false);

  const role = capitaliseFirstLetter(email.params.role);
  const industry = capitaliseFirstLetter(email.params.industry);

  return (
    <Card>
      <CardHeader>
        <div className="flex-col sm:flex sm:flex-row">
          <div className="grow">
            <CardTitle className="mb-1">{email.subject}</CardTitle>
            <CardDescription>{`To the ${role} from the ${industry} sector`}</CardDescription>
          </div>
          <div className="my-2 sm:my-0">
            <Button
              onClick={() => setIsSaved(true)}
              variant="outline"
              disabled={isSaved}
            >
              {!isSaved && <Plus className="mr-2 h-4 w-4" />}
              {isSaved ? 'Saved!' : 'Save Email'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse md:flex-row md:space-x-4">
          <div className="mt-4 whitespace-pre-line md:mt-0 md:basis-2/3">
            {Boolean(email.body) && email.body}
          </div>
          <div className="md:basis-1/3">
            {email.url ? (
              <Image
                className="rounded-md"
                src={email.url}
                alt="Your world with our product"
                width="500"
                height="500"
              />
            ) : (
              <Skeleton className="h-full max-h-[500px] w-full" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
