import Button from '@/presentation/components/Button'
import Logo from '../../Logo'
import { PiHeadsetDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { THeaderFormProps } from '@/domain/type/componentsPropsType'



const HeaderForm = ({ title, subTitle, className }: THeaderFormProps) => {
  return (
    <div
      className={twMerge(
        'relative text-center flex items-center text-base font-medium text-neutral-600 pb-10',
        className
      )}
    >
      <Button
        type="button"
        buttomIcon={<PiHeadsetDuotone />}
        color="transparent"
        size="small"
        rounded="normal"
        className="text-2xl p-4 flex sm:hidden rounded-xl"
      />
      <div className="grow flex flex-col">
        <Logo height={240} width={240} className="sm:hidden mb-6" />
        <div className="font-bold text-2xl sm:text-3xl pb-2 text-black mb-1">
          {title}
        </div>
        <div>{subTitle}</div>
      </div>
    </div>
  )
}

export default HeaderForm
