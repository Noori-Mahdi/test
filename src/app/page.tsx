import Container from '@/presentation/components/Container'
import LoginForm from '@/presentation/ui/forms/LoginForm'

import Logo from '@/presentation/ui/Logo'

export default function Home() {
  return (
    <Container className="flex flex-col sm:flex-row gap-10 sm:gap-20 sm:justify-center items-center min-h-screen">
      <Logo
        height={300}
        width={300}
        content="ویزیتان پلتفرمی قدرتمند برای اتصال مستقیم فروشگاه‌ها و تأمین‌کننده‌هاست، با ابزارهای پیشرفته و هوشمند، سفارشات خود را مدیریت کنید، تحویل را بهینه کنید و کسب و کارتان را رشد دهید. وارد شوید و تجربه‌ای متفاوت از ویزیت آنلاین داشته باشید"
        className={'hidden sm:flex sm:w-1/2'}
      />
      <LoginForm />
    </Container>
  )
}
