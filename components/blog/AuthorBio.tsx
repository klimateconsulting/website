import Image from 'next/image'
import Link from 'next/link'

interface AuthorBioProps {
  name: string
  role: string
  bio: string
  photo?: string
}

/** Grey author bio card shown after the article body (76px avatar). */
export default function AuthorBio({ name, role, bio, photo }: AuthorBioProps) {
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-kc-bg-grey px-9 py-8 sm:flex-row sm:items-center">
      {photo ? (
        /* Source: klimate-owned */
        <Image
          src={photo}
          alt={name}
          width={76}
          height={76}
          className="h-[76px] w-[76px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-kc-light-blue font-heading text-2xl font-semibold text-kc-blue">
          {name.charAt(0)}
        </div>
      )}
      <div>
        <div className="mb-1.5 font-heading text-[17px] font-semibold text-kc-dark">
          {name} · {role}
        </div>
        <p className="m-0 mb-2 font-body text-[13.5px] leading-[1.7] text-kc-text-secondary">
          {bio}
        </p>
        <Link
          href="/team/"
          className="font-body text-[13px] font-semibold text-kc-blue hover:text-kc-blue-dark"
        >
          Full bio &amp; publications →
        </Link>
      </div>
    </div>
  )
}
