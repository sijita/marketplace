'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import registerSchema from '@/app/(public)/login/schemas/register-schema';

export async function registerAction(formData: FormData) {
  try {
    const supabase = await createClient();

    const dataToParse = Object.fromEntries(formData);
    const parsedData = registerSchema.safeParse(dataToParse);

    if (!parsedData.success) {
      return {
        type: 'error',
        message: 'Hubo un error al registrarse, intentelo de nuevo',
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email: parsedData.data.email,
      password: parsedData.data.password,
    });

    if (error) {
      throw error.message;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ user_id: user?.id, name: parsedData.data.name }]);

    if (profileError) {
      throw profileError.message;
    }

    revalidatePath('/', 'layout');

    return {
      type: 'success',
      message: 'Registro exitoso, por favor verifique su correo',
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Hubo un error al registrarse, intentelo de nuevo',
      errors: error as string,
    };
  }
}
