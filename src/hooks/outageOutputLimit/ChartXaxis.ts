import { Dispatch, SetStateAction, useState } from 'react'

type XaxisState = {
  xaxisMin: number
  setXaxisMin: Dispatch<SetStateAction<number>>
  xaxisMax: number
  setXaxisMax: Dispatch<SetStateAction<number>>
}

export const useXaxis = (): XaxisState => {
  const [xaxisMin, setXaxisMin] = useState<number>(new Date().getTime())
  const [xaxisMax, setXaxisMax] = useState<number>(new Date().getTime())
  return {
    xaxisMin,
    setXaxisMin,
    xaxisMax,
    setXaxisMax,
  }
}
