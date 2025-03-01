import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export default function useSubmitAction() {
  const submitAction = async (
    action: (formData: FormData) => Promise<{
      type: string;
      message: string;
      errors?: string | { [key: string]: string[] } | undefined;
    }>,
    formData: FormData,
    redirectPath: string
  ) => {
    const { type, message, errors } = await action(formData);

    if (type === 'success') {
      toast.success(message as string);

      return redirect(redirectPath);
    }

    if (type === 'error') {
      let errorMessage = message;

      if (errors && typeof errors === 'object') {
        const fieldErrors = Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(', ')}`
          )
          .join('; ');
        errorMessage += `: ${fieldErrors}`;
      }

      toast.error(errorMessage);
    }
  };

  return { submitAction };
}
