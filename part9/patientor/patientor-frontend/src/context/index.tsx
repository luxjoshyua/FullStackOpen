import { createContext } from 'react'
import { Diagnosis } from '../types'

export const DiagnosesContext = createContext<Diagnosis[]>([])
