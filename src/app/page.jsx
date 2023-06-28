import { Noto_Naskh_Arabic } from 'next/font/google'

import { FaQuran } from 'react-icons/fa'

const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ['arabic'] })

async function getData() {
  return await fetch(
    `https://api.alquran.cloud/v1/ayah/${
      Math.floor(Math.random() * 6236) + 1
    }/editions/quran-uthmani,tr.yazir,ar.alafasy`,
    { next: { revalidate: 900 } }
  )
}

export default async function Home() {
  const data = await getData()
    .then((res) => res.json())
    .then((resJSON) => {
      const surahName = resJSON.data[0].surah.englishName
      const verseNumber = resJSON.data[0].numberInSurah

      const arabicVerseText = resJSON.data[0].text
      const translationVerseText = resJSON.data[1].text

      const verseAudioUrl = resJSON.data[2].audio

      return {
        surahName,
        verseNumber,
        arabicVerseText,
        translationVerseText,
        verseAudioUrl
      }
    })

  return (
    <main className="flex h-full items-center justify-center">
      <title>{`Vaktin Ayeti | ${data.surahName} - ${data.verseNumber}. Ayet`}</title>

      <div className="mx-4 max-h-[680px] w-[500px] overflow-y-auto rounded-2xl bg-[#1d1d1d]/60 p-4 shadow-2xl backdrop-blur">
        <div className="mb-4 flex">
          <div className="mr-4 rounded-full border border-white/60 p-4 text-xl">
            <FaQuran />
          </div>
          <div className="flex flex-col justify-around">
            <div className="text-lg font-bold">Vaktin Ayeti</div>
            <div className="text-base font-light">{`${data.surahName} - ${data.verseNumber}. Ayet`}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className={`text-lg ${NotoNaskhArabic.className}`} dir="rtl">
            {data.arabicVerseText}
          </div>
          <div className="rounded border border-white/60" />
          <div className="text-base">{data.translationVerseText}</div>
        </div>
        <audio controls className="mt-4 w-full">
          <source src={data.verseAudioUrl} type="audio/mpeg" />
        </audio>
      </div>
    </main>
  )
}
