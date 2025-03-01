'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { loginSchema } from '@/app/(public)/login/schemas/login-schema';

export async function loginAction(formData: FormData) {
  try {
    const supabase = await createClient();

    const dataToParse = Object.fromEntries(formData);
    const parsedData = loginSchema.safeParse(dataToParse);

    if (!parsedData.success) {
      return {
        type: 'error',
        message: 'Los datos ingresados son incorrectos',
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: parsedData.data.email,
      password: parsedData.data.password,
    });

    if (error) {
      throw error.message;
    }

    revalidatePath('/', 'layout');

    return {
      type: 'success',
      message: 'Sesion iniciada con exito',
    };
  } catch (error) {
    return {
      type: 'error',
      message: 'Hubo un error al iniciar sesion, intentelo de nuevo',
      errors: error as string,
    };
  }
}
