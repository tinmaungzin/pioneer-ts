import { useState } from "react";
import Image from "next/image";

type PhotoInputProps = {
  caption: string;
  name: string;
  register: any;
  errors: any;
};

function PhotoInput({ caption, name, register, errors }: PhotoInputProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>();
  const [isHovered, setIsHovered] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPhoto(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div className="my-4">
        <input
          type="file"
          id={name}
          className="hidden"
          {...register(name, {
            onChange: handlePhotoChange,
          })}
        />
        <label htmlFor={name}>
          <div className="border border-dashed border-gray-400 h-80 rounded-md cursor-pointer flex justify-center items-center">
            {!selectedPhoto ? (
              <p className="text-gray-400">Upload Photo</p>
            ) : (
              <div
                className="h-full w-full "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {!isHovered ? (
                  <Image
                    src={selectedPhoto}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-md"
                    width={500}
                    height={300}
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex justify-center items-center">
                    <p className="text-gray-500">Upload new photo</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </label>
        <p className="text-sm text-center pt-4">{caption}</p>
        {errors[name] && (
          <p className="text-red-500 text-xs text-center pt-4">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </>
  );
}

export default PhotoInput;
