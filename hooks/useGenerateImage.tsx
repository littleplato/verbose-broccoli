import React, { useCallback, useState } from 'react';
import { generateURL } from '@/utils/utils';

export default function useGenerateImage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const resetUrl = () => {
    setUrl('');
  };

  const generateImage = useCallback(async (summary: string) => {
    try {
      setIsLoading(true);
      const image = await fetch(generateURL('/api/image', { prompt: summary }));
      const imageSrc = await image.json();
      setUrl(imageSrc.url);
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { url, isError, isLoading, generateImage, resetUrl };
}
