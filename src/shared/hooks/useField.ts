import { useState } from 'react';

export type FieldStateProps = {
  value: string | undefined;
  error?: string | undefined;
};

export const useField = (defaultValue?: string) => {
    const [fieldState, setFieldState] = useState<FieldStateProps>({ value: defaultValue });

    const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFieldState({ value: e.currentTarget.value });
    };
    const reset = () => setFieldState({ value: defaultValue });
    const update = (value: string) => setFieldState({ value });
    const isEmpty = () => !fieldState.value;
    const setError = (error: string) => setFieldState({ ...fieldState, error });

    return {
        value: fieldState.value,
        error: fieldState.error,
        onChange,
        reset,
        update,
        isEmpty,
        setError,
    };
};
