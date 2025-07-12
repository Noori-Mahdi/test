'use client'
import { TSelectPreviousAccountProps } from '@/domain/type/componentsPropsType'
import { TPreviousAccount } from '@/domain/type/unit'
import customerShopList from '@/infrastructure/services/customerShopList'
import Button from '@/presentation/components/Button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

const SelectPreviousAccount = ({
  list,
}: TSelectPreviousAccountProps) => {
  const [accountList, setAccountList] = useState<TPreviousAccount[] | []>(list)
  const [selectAcount, setSelectAcount] = useState<null | string>(null)
  const getCustomerShopList = async () => {
    try {
      const result = await customerShopList()
      if (result) console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCustomerShopList()
  }, [])
  return (
    <div>
      <div className="text-lg font-medium select-none">انتخاب فروشگاه</div>
      <p className="text-sm font-medium leading-7 text-neutral-500 py-2 select-none">
        شماره همراه شما به چند فروشگاه در سامانه ویزیتان متصل است. لطفا فروشگاه
        مورد نظر را انتخاب کنید
      </p>
      <ul className="flex flex-col gap-3 pb-3">
        {accountList?.map((account, index) => (
          <li
            onClick={() => setSelectAcount(account.id)}
            key={account.id}
            className={twMerge(
              'flex gap-3 justify-between cursor-pointer p-3 border-2 border-transparent hover:border-green-500 rounded-lg',
              account.id === selectAcount && 'border-green-500'
            )}
          >
            <div>
              {account.image !== '' ? (
                <Image alt="" src={account.image} />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-neutral-500"></div>
              )}
            </div>
            <div className="grow text-sm font-medium text-neutral-500 select-none">
              <div>{account.addrese1}</div>
              <div>{account.addrese2}</div>
            </div>
            <FaCircleCheck
              className={
                account.id === selectAcount
                  ? 'text-green-500 visible text-lg'
                  : 'invisible'
              }
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <Button
          type="button"
          label="افزودن ادرس جدید"
          color="transparent"
          className="border-0"
        />
        <Button type="button" label="تایید" disabled={!selectAcount} />
      </div>
    </div>
  )
}

export default SelectPreviousAccount
