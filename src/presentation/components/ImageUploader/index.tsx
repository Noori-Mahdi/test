'use client'

import Image from 'next/image'
import { useState, ChangeEvent, useEffect, useRef } from 'react'
import { CiImageOn } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import Button from '../Button'
import { TFakeEventFile } from '@/domain/type'

export type ImageUploaderProps = {
  name: string
  defaultValue?: File
  onChange?: (e: TFakeEventFile) => void
}

export default function ImageUploader({
  name,
  defaultValue,
  onChange,
}: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(defaultValue ?? null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onChange?.({ target: { name, value: selectedFile } })
      setFile(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setImagePreview(imageUrl)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      const imageUrl = URL.createObjectURL(defaultValue)
      setImagePreview(imageUrl)
    }
  }, [defaultValue])

  return (
    <div className="w-fit mx-auto">
      <label className="relative text-center flex flex-col gap-3 justify-center items-center cursor-pointer rounded-lg">
        {!imagePreview ? (
          <>
            <CiImageOn className="text-3xl" />
            <div className="text-xs font-medium select-none">
              آپلود عکس فروشگاه
            </div>
          </>
        ) : (
          <>
            <div className="absolute flex justify-center items-center left-2 top-3 w-8 h-8 bg-white text-red-400 p-1 rounded-full hover:bg-red-500 hover:text-white">
              <GoTrash
                onClick={() => {
                  setImagePreview(null)
                  setFile(null)
                  onChange?.({ target: { name, value: '' } })
                }}
              />
            </div>

            <Button
              type="button"
              label="ویرایش عکس فروشگاه"
              color="muted"
              rounded="normal"
              onClick={() => fileInputRef.current?.click()}
              className="absolute text-neutral-500 bg-white py-2 text-sm hover:text-green-500"
            />
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <Image
            src={imagePreview}
            alt="عکس فروشگاه"
            width={150}
            height={150}
          />
        )}
      </label>
    </div>
  )
}
