import { addToCart } from '@/actions/add-to-cart';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useAddToCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      const { type, message } = await addToCart({
        productId,
        quantity,
      });

      setQuantity(1);

      if (type === 'success') {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    quantity,
    setQuantity,
    handleAddToCart,
  };
}
