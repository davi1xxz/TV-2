import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Clock, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimePickerProps {
  startTime: string
  endTime: string
  onTimeChange: (start: string, end: string) => void
  className?: string
}

const TimePicker = ({ startTime, endTime, onTimeChange, className }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localStartTime, setLocalStartTime] = useState(startTime)
  const [localEndTime, setLocalEndTime] = useState(endTime)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Gerar opções de horário de 00:00 a 23:59 (intervalos de 15 minutos)
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

  useEffect(() => {
    setLocalStartTime(startTime)
    setLocalEndTime(endTime)
  }, [startTime, endTime])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleStartTimeChange = (time: string) => {
    setLocalStartTime(time)
    if (time > localEndTime) {
      setLocalEndTime(time)
      onTimeChange(time, time)
    } else {
      onTimeChange(time, localEndTime)
    }
  }

  const handleEndTimeChange = (time: string) => {
    setLocalEndTime(time)
    onTimeChange(localStartTime, time)
  }

  const handleConfirm = () => {
    onTimeChange(localStartTime, localEndTime)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {startTime} - {endTime}
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </Button>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 p-4 animate-in fade-in-0 zoom-in-95"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Início</Label>
              <select
                value={localStartTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeOptions.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium">Fim</Label>
              <select
                value={localEndTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeOptions.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t">
            <Button
              type="button"
              onClick={handleConfirm}
              className="w-full"
              size="sm"
            >
              Confirmar Horário
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { TimePicker } 