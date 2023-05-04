import useLoginModal from '@/hooks/useLoginModal'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const loginModal = useLoginModal();
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
