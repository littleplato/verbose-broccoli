import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { generateUUID } from '@/utils/utils';
import useGenerateImage from './useGenerateImage';

export default function useWriteEmail() {
  const {
    generateImage,
    url,
    isLoading: isImageLoading,
    resetUrl,
  } = useGenerateImage();
  const [body, setBody] = useState('');
  const [params, setParams] = useState<EmailPrompt>({
    industry: '',
    role: '',
    product: '',
  });
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);

  const writeEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const industry = formData.get('industry')?.toString().trim();
    const role = formData.get('role')?.toString().trim();
    const product = formData.get('product')?.toString().trim();

    if (!industry || !role || !product) {
      setIsIncomplete(true);
      return;
    }
    setBody('');
    resetUrl();
    setParams({
      industry,
      role,
      product,
    });

    try {
      setIsLoading(true);
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          params: {
            industry,
            role,
            product,
          },
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
        setBody((prev) => prev + chunkValue);
      }
      generateImage({ industry, product });
      setId(generateUUID());
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    writeEmail,
    isLoading,
    body,
    isError,
    isIncomplete,
    params,
    id,
    url,
  };
}
