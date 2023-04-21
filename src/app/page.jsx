import { Noto_Naskh_Arabic } from 'next/font/google'

import { FaQuran } from 'react-icons/fa'

import FramerAnimation from './components/FramerAnimation'

const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ['arabic'] })

async function getData() {
  return await fetch(
    `https://api.acikkuran.com/surah/${
      Math.floor(Math.random() * 114) + 1
    }?author=15`,
    { next: { revalidate: 900 } }
  )
}

export default async function Home() {
  const data = await getData()
    .then((res) => res.json())
    .then((resJSON) => {
      const surahName = resJSON.data.name
      const randomVerseNumber =
        Math.floor(Math.random() * resJSON.data.verse_count) + 1
      const verse = resJSON.data.verses[randomVerseNumber].verse
      const translationText =
        resJSON.data.verses[randomVerseNumber].translation.text

      return {
        surahName,
        randomVerseNumber,
        verse,
        translationText
      }
    })

  return (
    <main className="flex min-h-screen items-center justify-center">
      <title>{`Vaktin Ayeti | ${data.surahName} Suresi - ${
        data.randomVerseNumber + 1
      }. Ayet`}</title>
      <FramerAnimation>
        <div className="mb-4 flex">
          <div className="mr-4 rounded-full border border-white/60 p-4 text-xl">
            <FaQuran />
          </div>
          <div className="flex flex-col justify-around">
            <div className="text-lg font-bold">Vaktin Ayeti</div>
            <div className="text-base font-light">{`${
              data.surahName
            } Suresi - ${data.randomVerseNumber + 1}. Ayet`}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className={`text-lg ${NotoNaskhArabic.className}`} dir="rtl">
            {data.verse}
          </div>
          <div className="rounded border border-white/60" />
          <div className={`text-base `}>{data.translationText}</div>
        </div>
      </FramerAnimation>
    </main>
  )
}
