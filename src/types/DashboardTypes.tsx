export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
}

export interface CurrentUnits {
  time: string
  interval: string
  wind_speed_10m: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
}

export interface Current {
  time: string
  interval: number
  wind_speed_10m: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
}

export interface HourlyUnits {
  time: string
  wind_speed_10m: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
}

export interface Hourly {
  time: string[]
  wind_speed_10m: number[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  apparent_temperature: number[]
}
