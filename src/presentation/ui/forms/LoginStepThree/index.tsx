'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/presentation/components/Map'), {
  ssr: false,
})

import {
  TFakeEvent,
  TFakeEventFile,
  TFakeEventNumber,
  TLoginStepThreePros,
} from '@/domain/type'
import BtnGroup from '@/presentation/components/BtnGroup'
import Button from '@/presentation/components/Button'
import CheckBox from '@/presentation/components/CheckBox'
import DropDown, { TOption } from '@/presentation/components/DropDown'
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

type TFormValues = {
  address: string
  location_lat: string
  location_lng: string
  shop_image?: File
}

const LoginStepThree = ({ className }: TLoginStepThreePros) => {
  const [step, setStep] = useState<'step1' | 'step2'>('step1')
  const [showMap, setShowMap] = useState(false)
  const [acceptRule, setAcceptRule] = useState(false)
  const [formValues, setFormValues] = useState<TFormValues>({
    address: '',
    location_lat: '',
    location_lng: '',
    shop_image: undefined,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {}
  )
  const [guildList, setguildList] = useState<TOption[] | []>([])
  const { state, dispatch } = useLogin()

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formValues, 'formValues')
  }

  // const getGroupGuilds = async () => {
  //   try {
  //     const result = await groupGuilds()
  //     if (result.data.group_guilds) {
  //       setguildList(result.data.group_guilds)
  //     } else {
  //       console.log('گروهی یافت نشد')
  //     }
  //     console.log(result.data, 'data')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    setguildList([...fackAcount])

    // getGroupGuilds
  }, [])

  const formOne = (
    <form className="w-full flex flex-col gap-5">
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
              state.formData.location_lat && state.formData.location_lng
                ? {
                    lat: parseFloat(state.formData.location_lat),
                    lng: parseFloat(state.formData.location_lng),
                  }
                : undefined
            }
          />
        )}
      </Container>
      <div>
        <div>{'adress'}</div>
        <Input
          name="address"
          type="text"
          inputIcon={<HiOutlineMapPin className="text-2xl" />}
          label="آدرس فروشگاه را وارد کنید"
          classNameIcon="p-3"
          error={formErrors['adress'] ?? null}
          onChange={handleChange}
          defaultValue={state.formData.address ?? ''}
        />
      </div>
      <ImageUploader
        name="shop_image"
        onChange={handleChange}
        defaultValue={state.formData.shop_image}
      />
      <Button
        type="button"
        label="تایید و ادامه"
        onClick={() => {
          dispatch({
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
        color={
          formValues.address &&
          formValues.location_lat &&
          formValues.location_lng &&
          formValues.shop_image
            ? 'primary'
            : 'muted'
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
        defaultValue={state.formData.shop_name ?? ''}
      />
      {guildList.length > 0 && (
        <DropDown
          name="Guild"
          options={guildList}
          icon={<IoGridOutline className="text-xl" />}
          label="گروه صنفی"
          defaultValue={state.formData.guild_id ?? 0}
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
        defaultValue={state.formData.user_full_name ?? ''}
      />
      <DynamicInputList
        label="شماره موبایل"
        name="phoneNumber"
        defaultValue={state.phone}
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
    <div className="flex flex-col gap-5 items-center">
      <div className="text-center w-full">
        <div className="text-2xl font-semibold">تکمیل اطلاعات شما</div>
        <div className="text-base text-neutral-500 font-medium">
          برای تکمیل پروفایل خود، لطفا اطلاعات مورد نیاز را وارد کنید
        </div>
      </div>
      <BtnGroup
        btnList={[
          {
            label: 'موقعیت فروشگاه',
            active: step === 'step1' ? true : false,
            disable: false,
            onClick: () => {
              setStep('step1')
            },
          },
          {
            label: 'اطلاعات تکمیلی',
            active: step === 'step2' ? true : false,
            disable: !(
              Boolean(state.formData.address) &&
              typeof state.formData.location_lat === 'string' &&
              typeof state.formData.location_lng === 'string'
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
        className="text-2xl p-4"
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
                location_lat: e.lat.toString(),
                location_lng: e.lng.toString(),
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
