import { Request, Response, urlencoded } from "express";
import ShortUniqueId from 'short-unique-id';
import UrlModel from "../model/urlModel"
import IUrl from "../interface/IUrl";

const uid = new ShortUniqueId({ length: 4 });




export const handleGenerateShortUrl = async (req: Request, res: Response) => {
   try {
    const {url} = req.body;
    if(!url){
        return res.status(400).json({success: false, message: "URL not found!"})
    }
    const shortId = uid.rnd()
    const shortenUrl = new UrlModel({
        redirectUrl: url,
        shortUrl: shortId,
    })
    await shortenUrl.save()
    return res.status(201).json({success: true, shortenUrl})
   } catch (error) {
    console.log(error)
   }
}


export const handleRedirectUrl = async (req: Request, res: Response) => {
    try{
        const {shortId} = req.params
        if(!shortId) return res.status(400).json({success: false, message: "Short URL not found!"})
        
        const urlExists = await UrlModel.findOne({shortUrl: shortId});
        if(!urlExists){
            return res.status(404).json({success: false, message: "Url not found!"})
        }
        await UrlModel.findOneAndUpdate({shortUrl: shortId}, {$inc: {clicks: 1}});

        return res.status(201).json({success: true, url: urlExists})
        //  res.redirect(urlExists.redirectUrl)
    }catch(error){
        console.log(error)
    }
}

export const handleUrlAnalytics = async(req: Request, res: Response) => {
    try {
        const {shortId} = req.params;
        if(!shortId) return res.status(400).json({success: false, message: "Short URL not found"})

        const urlExists = await UrlModel.findOne({shortUrl: shortId});
        if(!urlExists) return res.status(404).json({success: false, message: "Url not found!"})

        return res.status(200).json({success: true, totalCount: urlExists.clicks})
    } catch (error) {
        console.log(error)
    }
}

export const handleGetUrl = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(400).json({success: false, message: "Id not found"})
        const url = await UrlModel.findById(id);
        return res.status(200).json({success: true, url})
    } catch (error) {
        console.log(error)
    }
}