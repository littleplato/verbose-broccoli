'use client';

import { create } from 'zustand';
import { Story } from '@/types/story';

type StoryStore = {
  stories: Story[];
  addStory: (story: Story) => void;
  removeStory: (story: Story) => void;
};

const addStory = (stories: Story[], story: Story) => [...stories, story];

export const useStoryStore = create<StoryStore>((set) => ({
  stories: [],
  addStory(story: Story) {
    set((state) => ({
      ...state,
      stories: addStory(state.stories, story),
    }));
  },
  removeStory(story: Story) {
    set((state) => ({
      ...state,
      stories: state.stories.filter((s) => s.id !== story.id),
    }));
  },
}));
