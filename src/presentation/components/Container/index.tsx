import { TContainerProps } from '@/domain/type/componentsPropsType'
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
        'px-5 py-10 md:px-20  lg:px-24 ',
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
