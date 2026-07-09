export default function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="not-prose my-10 border-l-[3px] border-kc-yellow py-1.5 pl-7">
      <p className="m-0 font-heading text-[23px] font-medium leading-[1.5] tracking-[-0.01em] text-kc-dark">
        {children}
      </p>
    </blockquote>
  )
}
