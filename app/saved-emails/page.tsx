'use client';

import React from 'react';
import { useStoryStore } from '@/src/store';
import StoryCard from '@/components/story-card';

const Title = ({ numberOfStories }: { numberOfStories: number }) => {
  let title = '';
  if (!numberOfStories) {
    title = 'You have no saved stories';
  }
  if (numberOfStories === 1) {
    title = 'Your saved story';
  }
  if (numberOfStories > 1) {
    title = 'Your saved stories';
  }
  return <h1 className="text-lg font-bold">{title}</h1>;
};

export default function SavedBooksPage() {
  const stories = useStoryStore((state) => state.stories);
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <div className="flex-col space-y-4">
        <Title numberOfStories={stories.length} />
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </section>
  );
}
