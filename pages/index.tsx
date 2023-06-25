import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to another page
    router.push('/clients')
  }, [])

  return null // Render nothing for the default page
}

export default HomePage
