import { TContainerProps } from '@/domain/type'
import { twMerge } from 'tailwind-merge'

const Container = ({
  children,
  className,
  removeSpaceX = false,
  removeSpaceY = false,
}: TContainerProps) => {
  return (
    <div
      className={twMerge(
        'px-3 py-3 md:px-16  lg:px-24 ',
        removeSpaceX && 'px-0',
        removeSpaceY && 'py-0',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
