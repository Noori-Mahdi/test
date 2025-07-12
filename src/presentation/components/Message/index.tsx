import { TMessageProps } from '@/domain/type/componentsPropsType'
import { IoWarningOutline } from 'react-icons/io5'
import {
  MdCheckCircleOutline,
  MdInfoOutline,
  MdOutlineReportGmailerrorred,
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'



const Message = ({ message, type }: TMessageProps) => {
  return (
    <div
      className={twMerge(
        'text-xs flex items-center rounded-lg font-medium p-2 gap-3',
        type === 'warning'
          ? 'text-amber-700 bg-amber-100'
          : type === 'info'
            ? 'text-sky-600 bg-sky-100'
            : type === 'error'
              ? 'text-red-800 bg-red-100'
              : 'text-green-500 bg-green-100'
      )}
    >
      {type === 'warning' ? (
        <IoWarningOutline className="text-2xl text-amber-500" />
      ) : type === 'info' ? (
        <MdInfoOutline className="text-2xl" />
      ) : type === 'error' ? (
        <MdOutlineReportGmailerrorred className="text-2xl" />
      ) : (
        <MdCheckCircleOutline className="text-2xl" />
      )}
      <span>{message}</span>
    </div>
  )
}

export default Message
