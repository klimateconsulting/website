import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Team — Klimate Consulting',
  description:
    'Meet the Klimate Consulting team. Experts in sustainability research, energy, water, and agriculture.',
}

const team = [
  {
    name: 'Arian Aghajanzadeh',
    role: 'Founder',
    photo: '/images/team/arian-aghajanzadeh.jpg',
    education:
      'BS Chemical Engineering, UC Berkeley; MS Chemical Engineering + Dean\'s Certificate in Energy Engineering and Economics, Cornell University',
    bio: 'Arian has 10 years of experience working with industrial, agricultural, water, and energy stakeholders in the U.S. and globally. Arian has been recognized as the subject matter expert in energy and water use in irrigated agriculture. Prior to launching Klimate Consulting, Arian was the Head of Sustainability at an agricultural technology startup. In that role, he was responsible for standing up a sustainability initiative for permanent crop farmers in California, leading activities to understand tree nut farming footprint including greenhouse gas emissions and water as well as carbon sequestration potential through regenerative farming. Arian holds a Bachelor of Science in Chemical Engineering from the University of California, Berkeley and a Master of Chemical Engineering with the Dean\'s Certificate in Energy Engineering and Economics from Cornell University.',
  },
  {
    name: 'Darren Sholes',
    role: 'Senior Consultant',
    photo: '/images/team/darren-sholes.jpg',
    education: '',
    bio: 'Darren brings 10 years of experience working at the intersection of advanced manufacturing, renewable energy technology and data science in the public and private sector. Prior to Klimate Consulting, Darren provided technical assistance to the Department of Energy, with a focus on the water-energy nexus in manufacturing. He has also worked as a data science consultant, building Social Network Analysis tools to strengthen international development ecosystems. Most recently, he worked with giga-scale battery manufacturers, building tools to enhance quality and efficiency in their factories.',
  },
]

export default function TeamPage() {
  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-kc-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto">
            A small team with deep expertise in sustainability research, data science, and technical
            consulting.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-kc-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-16">
            {team.map((member) => (
              <div
                key={member.name}
                className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start"
              >
                <div className="text-center md:text-left">
                  {/* Source: klimate-owned */}
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={280}
                    height={280}
                    className="w-48 md:w-full h-auto rounded-xl object-cover mx-auto"
                  />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-kc-dark dark:text-white">
                    {member.name}
                  </h2>
                  <p className="font-body text-kc-blue dark:text-kc-light-blue font-semibold mt-1 mb-4">
                    {member.role}
                  </p>
                  <p className="font-body text-kc-text-secondary dark:text-gray-300 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  {member.education && (
                    <p className="font-body text-sm text-kc-text-secondary dark:text-gray-400">
                      <strong>Education:</strong> {member.education}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
