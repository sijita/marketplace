'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import sellSchema from '@/app/(auth)/sell/schemas/sell-schema';

export async function sellAction(formData: FormData): Promise<{
  type: string;
  message: string;
  errors?:
    | string
    | {
        [key: string]: string[];
      };
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        type: 'error',
        message: 'Debes iniciar sesion para publicar un producto',
      };
    }

    const dataToParse = Object.fromEntries(formData);
    const parsedData = sellSchema.safeParse({
      ...dataToParse,
      price: +dataToParse.price,
      stock: +dataToParse.stock,
      freeShipping: dataToParse.freeShipping === 'true',
    });

    console.log(parsedData);
    console.log(parsedData?.error?.flatten().fieldErrors);

    if (!parsedData.success) {
      return {
        type: 'error',
        message: 'Hay errores en los datos ingresados',
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const imagesFiles = Array.from(formData.getAll('images'));
    const imageUrls = [];

    for (const imageFile of imagesFiles) {
      const uniquePath = `public/${user.id}/${Date.now()}-${
        parsedData.data.productName
      }`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from('products_images')
        .upload(uniquePath, imageFile);

      if (imageError) {
        for (const url of imageUrls) {
          await supabase.storage.from('products_images').remove([url]);
        }

        return {
          type: 'error',
          message: 'Hubo un error al subir la imagen',
          errors: imageError.message,
        };
      }

      imageUrls.push(imageData.path);
    }

    const { data: location, error: locationError } = await supabase
      .from('locations')
      .insert({
        municipality_id: parseInt(parsedData.data.city),
        address: parsedData.data.address,
      })
      .select('id')
      .single();

    if (locationError) {
      return {
        type: 'error',
        message: 'Hubo un error al guardar la ubicación',
        errors: locationError.message,
      };
    }

    const { error } = await supabase.from('products').insert({
      name: parsedData.data.productName,
      description: parsedData.data.description,
      images: imageUrls,
      category_id: parsedData.data.category,
      price: parsedData.data.price,
      stock: parsedData.data.stock,
      condition: parsedData.data.condition,
      free_shipping: parsedData.data.freeShipping,
      location_id: location.id,
      seller_id: user.id,
    });

    if (error) {
      return {
        type: 'error',
        message: 'Hubo un error al guardar el producto',
        errors: error.message,
      };
    }

    revalidatePath('/sell');

    return {
      type: 'success',
      message: 'Producto publicado con exito',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: 'Hubo un error al publicar el producto',
      errors: error as string,
    };
  }
}
