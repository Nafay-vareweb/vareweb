// Admin root layout - minimal, just provides HTML structure
// The sidebar/header layout is in (panel)/layout.tsx for authenticated pages
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
