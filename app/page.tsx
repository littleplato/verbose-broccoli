'use client';

import { genres } from '@/utils/consts';
import { Loader2 } from 'lucide-react';
import useMakeStory from '@/hooks/useMakeStory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StoryCard from '@/components/story-card';

export default function IndexPage() {
  const { makeStory, isLoading, isError, ...story } = useMakeStory();
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <h1 className="text-center text-3xl font-bold">Automatic Parakeet</h1>
      <sub className="text-center text-sm">
        A little experimental storybook generator
      </sub>
      <form className="mt-6" onSubmit={makeStory}>
        <div className="mt-4 flex w-full flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <div className="w-full md:basis-2/3">
            <Input
              name="prompt"
              type="text"
              placeholder="Enter the title of your story"
              maxLength={100}
              autoComplete="off"
            />
          </div>
          <div className="flex w-full items-center space-x-2 md:basis-1/3">
            <Select name="genre">
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.value} value={genre.value}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="min-w-[140px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Make Story'}
            </Button>
          </div>
        </div>
      </form>
      <div className="my-4" />
      {/* {story.story && `Generating a ${story.genre} story: ${story.title}`} */}
      {isError && 'Something went wrong. Please try again.'}
      {!isError && story.story && <StoryCard {...story} isNewStory />}
    </section>
  );
}
