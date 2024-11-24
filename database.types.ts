export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          // the data expected from .select()
          id: number
          text: string
          completed: boolean
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never // generated columns must not be supplied
          text: string // `not null` columns with no default must be supplied
          completed: boolean // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never
          text?: string // `not null` columns are optional on .update()
          completed?: Json | null
        }
      }
    }
  }
}