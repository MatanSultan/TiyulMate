import { useId } from 'react'
import { type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { brandCopy } from '@/lib/brand-copy'

export function LogoMark({ className }: { className?: string }) {
  const id = useId()
  const tileGradient = `${id}-tile`
  const landGradient = `${id}-land`
  const trailGradient = `${id}-trail`

  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={tileGradient} x1="14" y1="10" x2="80" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2D1" />
          <stop offset="0.44" stopColor="#E8C68E" />
          <stop offset="1" stopColor="#CA7B49" />
        </linearGradient>
        <linearGradient id={landGradient} x1="18" y1="38" x2="78" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2C6A6B" />
          <stop offset="1" stopColor="#7A8E58" />
        </linearGradient>
        <linearGradient id={trailGradient} x1="46" y1="26" x2="56" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF8" />
          <stop offset="1" stopColor="#F7E7C7" />
        </linearGradient>
      </defs>

      <rect x="6" y="6" width="84" height="84" rx="28" fill={`url(#${tileGradient})`} />
      <circle cx="68" cy="28" r="8" fill="#FFF8E8" opacity="0.96" />
      <path
        d="M16 64C24 51 35 44 48 44C61 44 74 51 82 66V90H16V64Z"
        fill={`url(#${landGradient})`}
      />
      <path
        d="M48 22C57.389 22 65 29.411 65 38.552C65 50.302 53.223 62.009 48 67C42.777 62.009 31 50.302 31 38.552C31 29.411 38.611 22 48 22Z"
        fill="#FFFCF6"
        opacity="0.96"
      />
      <circle cx="48" cy="38" r="7" fill="#C96E43" />
      <path
        d="M48 67C45.238 70.111 42.483 73.917 40.607 78"
        stroke={`url(#${trailGradient})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M18 70C28.667 64.667 39.667 62.667 51 64C61.667 65.333 71.667 69 81 75"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 77C29.333 72.333 39.667 70.667 49 72C58.333 73.333 68.667 77.333 80 84"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

type LogoLockupProps = {
  locale: Locale
  className?: string
  markClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  compact?: boolean
  showTagline?: boolean
}

export function LogoLockup({
  locale,
  className,
  markClassName,
  titleClassName,
  subtitleClassName,
  compact = false,
  showTagline = true,
}: LogoLockupProps) {
  const copy = brandCopy[locale]

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <div
        className={cn(
          'rounded-[1.5rem] border border-white/45 bg-white/65 p-1 shadow-[0_20px_55px_-32px_rgba(116,78,50,0.46)] backdrop-blur-sm',
          compact ? 'h-12 w-12' : 'h-14 w-14',
          markClassName,
        )}
      >
        <LogoMark className="h-full w-full" />
      </div>

      <div className="min-w-0">
        <div
          className={cn(
            'wordmark-display text-foreground',
            compact ? 'text-[1.35rem] leading-none' : 'text-3xl leading-none sm:text-[2.2rem]',
            titleClassName,
          )}
        >
          TiyulMate
        </div>
        {showTagline && (
          <p
            className={cn(
              'max-w-md text-sm text-muted-foreground',
              compact ? 'mt-1 line-clamp-1 text-xs' : 'mt-2',
              subtitleClassName,
            )}
          >
            {copy.tagline}
          </p>
        )}
      </div>
    </div>
  )
}
