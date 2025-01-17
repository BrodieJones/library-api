/**
 * The types of publications that can be accessed.
 * - `wt`: Watchtower
 * - `oclm`: Our Christian Life & Ministry Workbook
 */
export type PublicationType = 'wt' | 'oclm'

/**
 * Constructor params for {@link Publication} class.
 */
export interface PublicationCtor {
  /**
   * The filename of the downloaded publication.
   * This must be the NameFragment as it is used the internal database too.
   *
   * @example 'w_E_202012'
   */
  filename: string
  /**
   * The directory where the publication is located.
   *
   * @example 'downloads/publications'
   */
  dir: string
  /**
   * @see PublicationType
   */
  type: PublicationType
}
