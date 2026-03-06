import { useCallback, useEffect, useState } from 'react'

let hasPlayed = false

const useIntroAnimation = () => {
  const [showIntro, setShowIntro] = useState(!hasPlayed)

  useEffect(() => {
    hasPlayed = true
  }, [])

  const completeIntro = useCallback(() => {
    setShowIntro(false)
  }, [])

  return { showIntro, completeIntro }
}

export default useIntroAnimation
