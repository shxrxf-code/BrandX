export default function BodyContent({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="relative z-10">
      {children}
    </main>
  )
}
