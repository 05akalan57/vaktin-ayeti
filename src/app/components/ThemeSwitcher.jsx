'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { AiOutlineLoading } from 'react-icons/ai'
import { FaRandom } from 'react-icons/fa'

const themes = [
  '#C3447A',
  '#34568B',
  '#955251',
  '/images/unsplash-1.jpg',
  '/images/unsplash-2.jpg',
  '/images/unsplash-3.jpg'
]

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState(
    (typeof window !== 'undefined' && localStorage.getItem('activeTheme')) ||
      themes[0]
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isClickable, setIsClickable] = useState(true)

  useEffect(() => {
    document.body.style.background = activeTheme
    typeof window !== 'undefined' &&
      localStorage.setItem('activeTheme', activeTheme)
  }, [activeTheme])

  const handleThemeChange = (theme) => {
    if (isClickable) {
      setActiveTheme(theme)

      if (theme.startsWith('#')) {
        setIsLoading(false)
      } else {
        const backgroundImage = new Image()
        backgroundImage.onload = () => {
          setActiveTheme(`url(${backgroundImage.src}) center / cover`)
          setIsLoading(false)
        }
        backgroundImage.src = theme
      }
    }
  }

  const handleRandomTheme = () => {
    if (isClickable) {
      setIsClickable(false)
      setIsLoading(true)

      fetch(
        'https://api.unsplash.com/photos/random?orientation=landscape&collections=67255129&client_id=GTs2Frl257NsG1B5V0ha7MC4WprHa-h8bSLEkQuBtFk'
      )
        .then((res) => res.json())
        .then((resJSON) => {
          const backgroundImage = new Image()
          backgroundImage.onload = () => {
            setActiveTheme(`url(${backgroundImage.src}) center / cover`)
            setIsClickable(true)
            setIsLoading(false)
          }
          backgroundImage.src = resJSON.urls.full
        })
    }
  }

  return (
    <div className="fixed bottom-0 left-1/2 mb-4 -translate-x-1/2 transform">
      <ul className="flex items-center justify-center space-x-2 rounded-full bg-[#1d1d1d]/60 p-2 backdrop-blur">
        {themes.slice(0, themes.length / 2).map((theme, i) => (
          <ThemeButton
            key={i}
            theme={theme}
            isActive={
              activeTheme.startsWith('#')
                ? activeTheme === theme
                : activeTheme.includes(theme)
            }
            onClick={() => handleThemeChange(theme)}
          />
        ))}
        <li
          className="cursor-pointer rounded-full"
          onClick={() => handleRandomTheme()}
        >
          <div className="flex h-8 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-500">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <AiOutlineLoading />
              </motion.div>
            ) : (
              <FaRandom />
            )}
          </div>
        </li>
        {themes.slice(themes.length / 2).map((theme, i) => (
          <ThemeButton
            key={i}
            theme={theme}
            isActive={
              activeTheme.startsWith('#')
                ? activeTheme === theme
                : activeTheme.includes(theme)
            }
            onClick={() => handleThemeChange(theme)}
          />
        ))}
      </ul>
    </div>
  )
}

function ThemeButton({ theme, isActive, onClick }) {
  const variants = {
    active: {
      scale: 1.1,
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)'
    },
    inactive: {
      scale: 1,
      boxShadow: 'none'
    }
  }

  return (
    <motion.li
      layout
      variants={variants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
      className={`h-8 w-8 cursor-pointer rounded-full`}
      style={{
        background: theme.startsWith('#')
          ? theme
          : `url(${theme.replace('.jpg', '_thumb.jpg')}) center / cover`
      }}
      onClick={onClick}
    />
  )
}
