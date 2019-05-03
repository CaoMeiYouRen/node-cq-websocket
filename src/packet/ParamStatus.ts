/**
 * @module packet
 */
/**
 */

export interface ParamStatus {
  app_initialized: boolean
  app_enabled: boolean
  plugins_good: Record<string, boolean>
  app_good: boolean
  online: boolean
  good: boolean
}
