import { CATALOG_PATH } from 'src/constants'
import { checkExists } from 'src/utils'
import { downloadCatalog } from 'src/download'

/**
 * Checks whether the currently downloaded catalog is the latest version & updates it if not.
 *
 * Returns `true` if the catalog was updated, `false` if it was already the latest version.
 */
export async function updateCatalog (): Promise<boolean> {
  // TODO: Check for newer catalog & download
  const exists = await checkExists(CATALOG_PATH)
  if (!exists) {
    await downloadCatalog()
    return true
  }
  return false
}
