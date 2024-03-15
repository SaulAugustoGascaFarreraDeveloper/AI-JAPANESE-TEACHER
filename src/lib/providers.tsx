import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'

interface ProvidersProps{
    children: React.ReactNode
}

const Providers = ({children} : ProvidersProps) => {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism}} >
        {children}
    </ClerkProvider>
  )
}

export default Providers