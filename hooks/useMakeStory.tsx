import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { generateURL, generateUUID } from '@/utils/utils';
import useGenerateImage from './useGenerateImage';

export default function useMakeStory() {
  const {
    generateImage,
    url,
    isLoading: isImageLoading,
    resetUrl,
  } = useGenerateImage();
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef('');

  useEffect(() => {
    if (story && !isImageLoading && ref.current !== id) {
      const summary = story.substring(0, story.search(/\./g));
      generateImage(summary);
      ref.current = id;
    }
  }, [story, isImageLoading, generateImage, id]);

  const makeStory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();
    const type = formData.get('genre')?.toString().trim() || 'heroic';
    if (!prompt) {
      return;
    }
    setStory('');
    resetUrl();
    setTitle(prompt);
    setGenre(type);
    try {
      setIsLoading(true);
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          genre: type,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setStory((prev) => prev + chunkValue);
      }
      setId(generateUUID());
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { makeStory, isLoading, story, isError, title, genre, id, url };
}
