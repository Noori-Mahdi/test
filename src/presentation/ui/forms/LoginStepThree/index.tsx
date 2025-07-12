'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/presentation/components/Map'), {
  ssr: false,
})

import BtnGroup from '@/presentation/components/BtnGroup'
import Button from '@/presentation/components/Button'
import CheckBox from '@/presentation/components/CheckBox'
import DropDown from '@/presentation/components/DropDown'
import DynamicInputList from '@/presentation/components/DynamicInputList'
import ImageUploader from '@/presentation/components/ImageUploader'
import Input from '@/presentation/components/Input'
import Message from '@/presentation/components/Message'
import { useLogin } from '@/presentation/contexts/LoginContext'
import { useEffect, useState } from 'react'
import { BiStoreAlt, BiUser } from 'react-icons/bi'
import { CiBarcode } from 'react-icons/ci'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { IoGridOutline } from 'react-icons/io5'
import { LuPhone } from 'react-icons/lu'
import { PiHeadsetDuotone } from 'react-icons/pi'
import Container from '@/presentation/components/Container'
import Modal from '@/presentation/components/Modal'
import groupGuilds from '@/infrastructure/services/groupGuilds'
import { fackAcount } from '../../../../../data/fackAcount'
import { twMerge } from 'tailwind-merge'
import register from '@/infrastructure/services/register'
import { useAuth } from '@/presentation/contexts/AuthContext'
import { TLoginStepThreePros } from '@/domain/type/componentsPropsType'
import {
  TDropDownOption,
  TFakeEvent,
  TFakeEventFile,
  TFakeEventNumber,
} from '@/domain/type/unit'

type TFormValues = {
  shop_name: string
  address: string
  location_lat: number | null
  location_lng: number | null
  shop_image?: File
}

const LoginStepThree = ({ className }: TLoginStepThreePros) => {
  const [step, setStep] = useState<'step1' | 'step2'>('step1') // بخش‌های جدای فرم
  const [showMap, setShowMap] = useState(false)
  const [acceptRule, setAcceptRule] = useState(false)
  const [formValues, setFormValues] = useState<TFormValues>({
    shop_name: '',
    address: '',
    location_lat: null,
    location_lng: null,
    shop_image: undefined,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )
  const [guildList, setguildList] = useState<TDropDownOption[] | []>([]) // دریافت گروه‌های صنفی
  //  هوک کاستوم لاگین دیتای موقت برای رفت برگشت در فرم (Reduser + Context)
  const { state: loginState, dispatch: loginDispatch } = useLogin()
  //  هوک کاستوم اصلی کاربر در کل برنامه (Reduser + Context)
  const { state: authState } = useAuth()

  const locationObj = {
    road_side_id: 2,
    village_id: 2,
    sector_id: 2,
    area_id: 2,
    city_id: 2,
    township_id: 2,
    province_id: 2,
    location_type: 2,
  }

  //  ساختار رو به روی چک باکس به صورت React.ReactNode
  const checkBoxText = (
    <div className="font-medium text-neutral-500">
      مطالعه و پذیرش <span className="text-green-500">قوانین</span> و{' '}
      <span className="text-green-500">مقررات</span>
    </div>
  )

  const handleChange = (e: TFakeEvent | TFakeEventFile | TFakeEventNumber) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      ...formValues,
      ...loginState.formData,
      ...locationObj,
      user_id: authState.user.id,
      user_mobile_1: loginState.phone,
    }
    try {
      if (formValues.location_lat && formValues.location_lng) {
          const result = await register(data)
          console.log(result, 'result')
      }
    } catch (error) {}
  }

  const getGroupGuilds = async () => {
    try {
      const result = await groupGuilds()
      if (result.data.group_guilds) {
        setguildList(result.data.group_guilds)
      } else {
        console.log('گروهی یافت نشد')
        setguildList(fackAcount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGroupGuilds()
  }, [])

  const formOne = (
    <form className={twMerge('w-full flex flex-col gap-5')}>
      <Message
        message="تکمیل تمامی فیلدها الزامی است. لطفا اطلاعات را وارد کنید."
        type="warning"
      />
      <Container removeSpaceY className="px-10 sm:px-5 lg:px-10 md:px-5">
        {!showMap && (
          <Map
            isLock
            className={'w-full h-32 rounded-lg'}
            onClickBtn={() => setShowMap(true)}
            defaultValue={
              loginState.formData.location_lat &&
              loginState.formData.location_lng
                ? {
                    lat: loginState.formData.location_lat,
                    lng: loginState.formData.location_lng,
                  }
                : undefined
            }
          />
        )}
      </Container>
      <div>
        <div className="text-sm font-bold text-green-600 my-7">
          {'خراسان رضویی / مشهد / منطقه 2 / وکیل آباد 22'}
        </div>
        <Input
          name="address"
          type="text"
          inputIcon={<HiOutlineMapPin className="text-2xl" />}
          label="آدرس فروشگاه را وارد کنید"
          classNameIcon="p-3"
          error={formErrors['adress'] ?? null}
          onChange={handleChange}
          defaultValue={loginState.formData.address ?? ''}
        />
      </div>
      <ImageUploader
        name="shop_image"
        onChange={handleChange}
        defaultValue={loginState.formData.shop_image}
      />
      <Button
        type="button"
        label="تایید و ادامه"
        onClick={() => {
          if (formValues.location_lat && formValues.location_lng)
            loginDispatch({
              type: 'updateFormData',
              payload: {
                address: formValues.address,
                location_lat: formValues.location_lat,
                location_lng: formValues.location_lng,
                shop_image: formValues.shop_image,
              },
            })
          setStep('step2')
        }}
        disabled={
          formValues.address &&
          formValues.location_lat &&
          formValues.location_lng &&
          formValues.shop_image
            ? false
            : true
        }
      />
    </form>
  )
  const formTwo = (
    <form onSubmit={handleSubmit} className="w-full flex gap-3 flex-col">
      <Input
        name="shop_name"
        type="text"
        label="نام فروشگاه"
        inputIcon={<BiStoreAlt className="text-xl" />}
        error={formErrors['shop_name'] ?? null}
        onChange={handleChange}
        defaultValue={loginState.formData.shop_name ?? ''}
      />
      {guildList.length > 0 && (
        <DropDown
          name="Guild"
          options={guildList}
          icon={<IoGridOutline className="text-xl" />}
          label="گروه صنفی"
          defaultValue={loginState.formData.guild_id ?? 0}
          onChange={handleChange}
        />
      )}
      <Input
        name="user_full_name"
        type="text"
        label="نام و نام خانوادگی"
        inputIcon={<BiUser className="text-xl" />}
        error={formErrors['user_full_name'] ?? null}
        onChange={handleChange}
        defaultValue={loginState.formData.user_full_name ?? ''}
      />
      <DynamicInputList
        label="شماره موبایل"
        name="phoneNumber"
        defaultValue={loginState.phone}
        inputIcon={<LuPhone className="text-lg" />}
      />
      <Input
        name="inviteCode"
        type="text"
        label="کد معرف"
        inputIcon={<CiBarcode className="text-xl" />}
        error={null}
      />
      <CheckBox
        checkboxText={checkBoxText}
        onClick={(e) => {
          setAcceptRule(e)
        }}
      />
      <Button
        type="submit"
        label="تایید و ورود"
        disabled={!acceptRule}
        color={acceptRule ? 'primary' : 'muted'}
      />
    </form>
  )

  return (
    <div className={twMerge('flex flex-col gap-5 items-center', className)}>
      <BtnGroup
        btnList={[
          {
            label: 'موقعیت فروشگاه',
            active: step === 'step1' ? true : false,
            disable: false,
            className: '',
            onClick: () => {
              setStep('step1')
            },
          },
          {
            label: 'اطلاعات تکمیلی',
            active: step === 'step2' ? true : false,
            className: '',
            disable: !(
              Boolean(loginState.formData.address) &&
              typeof loginState.formData.location_lat === 'number' &&
              typeof loginState.formData.location_lng === 'number'
            ),
            onClick: () => {
              setStep('step2')
            },
          },
        ]}
      />
      {step === 'step1' ? formOne : formTwo}
      <Button
        type="button"
        buttomIcon={<PiHeadsetDuotone />}
        color="transparent"
        size="small"
        rounded="normal"
        className="text-2xl p-4 hidden sm:flex"
      />
      <Modal
        type={'map'}
        onClose={() => setShowMap(false)}
        isOpen={showMap}
        className="w-full h-full md:w-4/6 md:h-5/6 p-0"
      >
        <Map
          className="w-full h-full"
          blurDisable
          isLock={false}
          onClick={(e) => {
            if (e) {
              setFormValues((prev) => ({
                ...prev,
                location_lat: e.lat,
                location_lng: e.lng,
              }))
              setShowMap(false)
            }
          }}
          onClose={() => setShowMap(false)}
        />
      </Modal>
    </div>
  )
}

export default LoginStepThree
