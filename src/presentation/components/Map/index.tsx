'use client'
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../Button'
import Input from '../Input'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { IoIosClose } from 'react-icons/io'
import { TbChartTreemap } from 'react-icons/tb'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

export type TMapProps = {
  onClose?: () => void
  onClick?: (e: { lat: number; lng: number }) => void
  onClickBtn?: () => void
  defaultValue?: { lat: number; lng: number }
  isLock?: boolean
  blurDisable?: boolean
  className?: string
}

export default function Map({
  isLock = true,
  blurDisable = false,
  className,
  defaultValue,
  onClickBtn,
  onClick,
  onClose,
}: TMapProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(defaultValue ?? null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    const mapContainer = document.getElementById('map') as HTMLElement & {
      _leaflet_id?: number
    }
    if (mapContainer && mapContainer._leaflet_id != null)
      mapContainer._leaflet_id = undefined

    const map = L.map(mapContainer, {
      zoomControl: false,
      dragging: !isLock,
      scrollWheelZoom: !isLock,
      doubleClickZoom: !isLock,
      boxZoom: !isLock,
      keyboard: !isLock,
      touchZoom: !isLock,
    }).setView([35.6892, 51.389], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      setCoordinates({ lat, lng })

      if (markerRef.current) {
        markerRef.current.remove()
      }

      const customIcon = L.icon({
        iconUrl: '/Image/pin.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      const marker = L.marker([lat, lng], { icon: customIcon })
      marker.addTo(map)
      markerRef.current = marker
    })

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className={twMerge('relative', className)}>
      {!blurDisable ? (
        <div className="absolute left-0 top-0 w-full h-full bg-neutral-300/80 rounded-lg p-2 z-10 pointer-events-none flex justify-center items-center">
          <Button
            type="button"
            rounded="full"
            buttomIcon={<HiOutlineMapPin />}
            label="تغییر موقعیت مکانی"
            onClick={onClickBtn}
            className="w-full sm:w-2/3 text-sm pointer-events-auto"
          />
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 flex justify-between items-center p-1 text-center h-10 rounded-full pointer-events-none bg-white z-10">
            <div></div>
            <div>انتخاب آدرس</div>
            <IoIosClose
              onClick={onClose}
              className="text-2xl z-20 cursor-pointer pointer-events-auto"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-9/12 flex gap-2 flex-col justify-between items-end p-1 text-center pointer-events-none z-10">
            <div className="flex gap-2 pointer-events-auto">
              <Button
                onClick={() => {}}
                color="secondary"
                rounded="normal"
                type="button"
                size="fit"
                className="border-transparent p-2"
                buttomIcon={<TbChartTreemap className="text-lg" />}
              />
              <Button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.locate({ setView: true, maxZoom: 16 })
                  }
                }}
                color="secondary"
                rounded="normal"
                type="button"
                size="fit"
                className="border-transparent p-2"
                buttomIcon={<FaLocationCrosshairs className="text-lg" />}
              />
            </div>
            <Input
              name="address"
              inputIcon={<HiOutlineMapPin />}
              classNameIcon="text-lg p-3"
              type="text"
              error={null}
              hiddenBorder
              className="pointer-events-auto"
              readOnly
            />
            <Button
              onClick={() => {
                coordinates && onClick?.(coordinates)
              }}
              label="تایید و ادامه"
              type="button"
              className="pointer-events-auto text-sm py-2"
              disabled={coordinates?.lat && coordinates.lng ? false : true}
              color={coordinates?.lat && coordinates.lng ? 'primary' : 'muted'}
            />
          </div>
        </>
      )}

      <div id="map" className="z-0 w-full h-full rounded-lg" />
    </div>
  )
}
