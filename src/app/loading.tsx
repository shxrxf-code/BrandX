export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-accent-blue/20" />
        <div
          className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-accent-blue animate-spin"
          style={{ animationDuration: '0.8s' }}
        />
      </div>
    </div>
  )
}
