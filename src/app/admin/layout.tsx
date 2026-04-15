// Admin root layout - minimal, just provides HTML structure
// The sidebar/header layout is in (panel)/layout.tsx for authenticated pages
import RemoveLoader from './RemoveLoader'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <RemoveLoader />
      {children}
    </>
  )
}
