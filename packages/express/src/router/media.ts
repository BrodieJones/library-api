import { Router } from 'express'
import { getCatalogRow, PUBLICATION_TYPES, isValidDate } from '@library-api/core'
import { PublicationRow } from '@library-api/core/types/database'

import { CATALOG_PATH } from '../constants'
import { getPublicationWT, getPublicationOCLM } from '../publication'

import { Media } from '../../types/api'

const router = Router()

router.get('/watchtower', async (req, res) => {
  const { date } = req.query as Partial<Media.Watchtower.QueryParams>
  if (!isValidDate(date)) return res.status(401).json({ message: 'Invalid Date' })

  const pubQuery = `
    SELECT DISTINCT pa.NameFragment AS NameFragment, p.PublicationTypeId AS PublicationTypeId, p.MepsLanguageId AS PubMepsLanguageId
    FROM Publication AS p
    INNER JOIN PublicationAsset pa ON p.Id = pa.PublicationId
    INNER JOIN DatedText AS dt ON dt.PublicationId = p.Id
    WHERE dt.Start <= '${date}' AND dt.End >= '${date}' AND PubMepsLanguageId = 0 AND PublicationTypeId = ${PUBLICATION_TYPES.WATCHTOWER}`
  const result = await getCatalogRow<PublicationRow>(CATALOG_PATH, pubQuery)
  if (!result) return res.status(404).json({ message: 'No Watchtower Found' })

  const publication = await getPublicationWT(result)
  const images = await publication.getImages(date)
  const videos = await publication.getVideos(date)

  const response: Media.Watchtower.Response = {
    message: {
      images,
      videos
    }
  }

  return res.json(response)
})

router.get('/oclm', async (req, res) => {
  const { date } = req.query as Partial<Media.OCLM.QueryParams>
  if (!isValidDate(date)) return res.status(401).json({ message: 'Invalid Date' })

  const pubQuery = `
    SELECT DISTINCT pa.NameFragment AS NameFragment, p.PublicationTypeId AS PublicationTypeId, p.MepsLanguageId AS PubMepsLanguageId
    FROM Publication AS p
    INNER JOIN PublicationAsset pa ON p.Id = pa.PublicationId
    INNER JOIN DatedText AS dt ON dt.PublicationId = p.Id
    WHERE dt.Start <= '${date}' AND dt.End >= '${date}' AND PubMepsLanguageId = 0 AND PublicationTypeId = ${PUBLICATION_TYPES.OCLM}`
  const result = await getCatalogRow<PublicationRow>(CATALOG_PATH, pubQuery)
  if (!result) return res.status(404).json({ message: 'No OCLM Workbook Found' })

  const publication = await getPublicationOCLM(result)
  const images = await publication.getImages(date)
  const videos = await publication.getVideos(date)

  const response: Media.OCLM.Response = {
    message: {
      images,
      videos
    }
  }

  return res.json(response)
})

export const media = router