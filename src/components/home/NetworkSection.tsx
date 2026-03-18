'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const team = [
  { name: 'Ankith', role: 'IT Program Manager', image: '/images/team/ankith.png' },
  { name: 'Kaley', role: 'Customer Service Manager', image: '/images/team/kaley.png' },
  { name: 'Kerina', role: 'Account Manager', image: '/images/team/kerina.png' },
  { name: 'Alistair', role: 'Melb CBD Territory Owner', image: '/images/team/alistair.png' },
  { name: 'Luke', role: 'Sales Director', image: '/images/team/luke.png' },
]

export function NetworkSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1
    const gap = 16
    const index = Math.round(track.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.max(0, Math.min(index, team.length - 1)))
  }, [])

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="network-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Carousel side */}
          <div className="order-2 lg:order-1">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#095c7b' }}
            >
              Meet the Team
            </p>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              aria-label="Team members carousel"
            >
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className="snap-start flex-none w-52 rounded-2xl overflow-hidden border"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.80)',
                    borderColor: 'rgba(9,92,123,0.15)',
                  }}
                  aria-label={`${member.name}, ${member.role}`}
                >
                  {/* Photo area */}
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {/* Initials fallback — sits behind the image */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                      style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                      aria-hidden="true"
                    >
                      {member.name[0]}
                    </div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="208px"
                    />
                  </div>

                  {/* Name / role */}
                  <div className="px-4 py-3">
                    <p className="font-bold text-sm" style={{ color: '#103d39' }}>{member.name}</p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: '#4A7A5A' }}>{member.role}</p>
                  </div>
                </div>
              ))}

              {/* +100s card */}
              <div
                className="snap-start flex-none w-52 rounded-2xl border flex flex-col items-center justify-center text-center px-4"
                style={{ backgroundColor: 'rgba(234,240,68,0.18)', borderColor: 'rgba(234,240,68,0.5)', aspectRatio: undefined, minHeight: '280px' }}
                aria-label="Plus hundreds of owner-operators nationwide"
              >
                <p className="text-4xl font-bold mb-2" style={{ color: '#095c7b' }}>+100s</p>
                <p className="text-sm" style={{ color: '#103d39' }}>Owner-operators nationwide</p>
              </div>
            </div>

            {/* Dot indicators + arrow controls */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ backgroundColor: 'rgba(9,92,123,0.15)', color: '#095c7b' }}
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-1.5">
                {team.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? '20px' : '8px',
                      height: '8px',
                      backgroundColor: i === activeIndex ? '#095c7b' : 'rgba(9,92,123,0.3)',
                    }}
                    aria-label={`Go to ${team[i].name}`}
                    aria-current={i === activeIndex}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollTo(Math.min(team.length - 1, activeIndex + 1))}
                disabled={activeIndex === team.length - 1}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ backgroundColor: 'rgba(9,92,123,0.15)', color: '#095c7b' }}
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              Our Network
            </span>
            <h2
              id="network-heading"
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Our Network Delivers{' '}
              <span className="italic" style={{ color: '#103d39' }}>5-Star Service</span>
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: '#103d39' }}>
              Enjoy hassle-free shipping as your dedicated MailPlus owner-operator picks up
              and lodges your parcels and mail with same-day guarantees.
            </p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#103d39' }}>
              Business owners themselves, your business is their priority — ensuring punctual
              and reliable service every time. Plus, our expert Aussie-based Customer Service
              team is always ready to assist.
            </p>
            <Link
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              START SAVING
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
