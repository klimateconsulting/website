export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 pl-6 border-l-4 border-kc-blue not-prose">
      <div className="font-body text-lg md:text-xl text-kc-dark dark:text-gray-200 italic leading-relaxed">
        {children}
      </div>
    </blockquote>
  )
}
