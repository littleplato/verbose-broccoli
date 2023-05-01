import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { generateUUID } from '@/utils/utils';
import { EmailPrompt } from '@/types/email';
import { formatEmail } from './helper';
import useGenerateImage from './useGenerateImage';

export default function useWriteEmail() {
  const {
    generateImage,
    url,
    isLoading: isImageLoading,
    resetUrl,
  } = useGenerateImage();
  const [subject, setSubject] = useState('');
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
  const [isStreaming, setIsStreaming] = useState(false);

  const writeEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const industry = formData.get('industry')?.toString().trim().toLowerCase();
    const role = formData.get('role')?.toString().trim().toLowerCase();
    const product = formData.get('product')?.toString().trim().toLowerCase();

    if (!industry || !role || !product) {
      setIsIncomplete(true);
      return;
    }
    setSubject('');
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
      generateImage({ industry, product });
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      setIsStreaming(true);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        if (done) {
          setBody((prev) => {
            const fullEmail = prev + chunkValue;
            const [newSubject, newBody] = formatEmail(fullEmail);
            setSubject(newSubject);
            return newBody;
          });
          break;
        }
        setBody((prev) => prev + chunkValue);
      }
      setIsStreaming(false);
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
    isStreaming,
    subject,
  };
}
