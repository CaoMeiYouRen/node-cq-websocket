import { Filter } from './filter'
import { Context } from './context'

export class Channel {
  public disabled: boolean = false

  constructor (
    public readonly filter: Filter,
    public readonly priority: number
  ) {

  }

  public broadcast (ctx: Context): boolean {
    if (this.disabled) return false

    const matched = this.filter(ctx)
    if (matched) {
      //
    }
    return matched
  }

  public disable (): void {
    this.disabled = true
  }

  public enable (): void {
    this.disabled = false
  }
}
