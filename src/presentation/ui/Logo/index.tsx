import { TLogoProps } from '@/domain/type'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const Logo = ({
  height,
  width,
  content,
  classNameImage,
  classNameContext,
  className,
}: TLogoProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center gap-20 justify-center',
        className
      )}
    >
      <Image
        src={'/Image/Logo.png'}
        alt="Logo"
        width={width}
        height={height}
        className={classNameImage}
      />
      {content && (
        <p
          className={twMerge(
            'text-center text-base text-black font-semibold leading-loose hidden sm:block',
            classNameContext
          )}
        >
          {content}
        </p>
      )}
    </div>
  )
}

export default Logo
