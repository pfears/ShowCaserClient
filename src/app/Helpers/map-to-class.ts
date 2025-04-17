/**
 * Maps a plain object to a class instance.
 * @param Type The class constructor
 * @param raw The raw data object
 * @returns A mapped instance of the class
 */
export function mapToClass<T>(Type: new (data: any) => T, raw: any): T {
    return new Type(raw);
  }
  
  /**
   * Maps an array of plain objects to an array of class instances.
   * @param Type The class constructor
   * @param rawList The raw data array
   * @returns An array of class instances
   */
  export function mapListToClass<T>(Type: new (data: any) => T, rawList: any[]): T[] {
    return rawList.map(raw => new Type(raw));
  }