import { useState } from 'react';

export default function useSellFunctions({
  municipalities,
}: {
  municipalities: {
    id: number;
    name: string;
    department_id: number;
  }[];
}) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredMunicipalities = municipalities.filter(
    (municipality) => municipality.department_id === Number(selectedDepartment)
  );

  return {
    images,
    setImages,
    handleImageUpload,
    removeImage,
    filteredMunicipalities,
    selectedDepartment,
    setSelectedDepartment,
  };
}
