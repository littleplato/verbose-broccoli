import React, { useState } from 'react';
import Image from 'next/image';
import { useStoryStore } from '@/src/store';
import { Minus, Plus } from 'lucide-react';
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
import { useToast } from './ui/use-toast';

interface Props extends Story {
  isNewStory?: boolean;
}

export default function StoryCard({ isNewStory, ...story }: Props) {
  const { addStory, removeStory } = useStoryStore();
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const handleAddStory = () => {
    addStory(story);
    setIsSaved(true);
    toast({
      description: `"${story.title}" is saved to your collection.`,
    });
  };

  const handleRemoveStory = () => {
    removeStory(story);
    toast({
      description: `"${story.title}" is removed from your collection.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex-col sm:flex sm:flex-row">
          <div className="grow">
            <CardTitle className="mb-1">{story.title}</CardTitle>
            <CardDescription>{`A ${story.genre} story`}</CardDescription>
          </div>
          <div className="my-2 sm:my-0">
            {isNewStory ? (
              <Button
                onClick={handleAddStory}
                variant="outline"
                disabled={isSaved}
              >
                {!isSaved && <Plus className="mr-2 h-4 w-4" />}
                {isSaved ? 'Saved!' : 'Save story'}
              </Button>
            ) : (
              <Button onClick={handleRemoveStory} variant="outline">
                <Minus className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse md:flex-row md:space-x-4">
          <div className="mt-4 md:mt-0 md:basis-2/3">
            {story && <h5>{story.story}</h5>}
          </div>
          <div className="md:basis-1/3">
            {story.url ? (
              <Image
                className="rounded-md"
                src={story.url}
                alt="Story image"
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
