import Container from '@/presentation/components/Container'
import Logo from '@/presentation/ui/Logo'

export default function Loading() {
  return (
    <Container className="flex flex-col items-center justify-between h-screen w-screen lg:px-48 py-24">
      <Logo height={300} width={300} />
      <div className="text-center flex flex-col gap-10 font-medium">
        <span className="block font-bold text-4xl text-green-600">ویزیتان</span>
        <span className="text-neutral-500">
          بازاری هوشمند، راهی هوشمندانه برای موفقیت کسب‌وکار شما
        </span>
      </div>
    </Container>
  )
}
