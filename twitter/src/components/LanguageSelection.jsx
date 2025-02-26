import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'

function LanguageSelection() {
    const {i18n} = useTranslation()
    const changeLanguage = (lng)=> {
        i18n.changeLanguage(lng)
    }
    const languages = [
        {
            code:"en",
            lang:"English"
        },
        {
            code:"fr",
            lang:"French"
        },
        {
            code:"hi",
            lang:"Hindi"
        },
        {
            code:"zh",
            lang:"Chinese"
        },
        {
            code:"es",
            lang:"Spanish"
        },
        {
            code:"pt",
            lang:"Portuguese"
        }
    ]
  return (
    <div className="p-2 flex gap-2 border-b">
    {languages.map((lang, index) => (
        <p 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)} 
            className={`text-xs md:text-sm relative ${lang.code === i18n.language ? "border-b-2 border-sky-500" : ""} cursor-pointer `}
        >
            {lang.lang}
        </p>
    ))}
</div>

  )
}

export default LanguageSelection