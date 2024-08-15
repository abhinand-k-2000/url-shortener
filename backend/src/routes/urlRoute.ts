import express from "express";
const router = express.Router()
import {handleGenerateShortUrl, handleRedirectUrl, handleUrlAnalytics} from "../controller/urlController"

router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleRedirectUrl)
router.get('/analytics/:shortId', handleUrlAnalytics)


export default router