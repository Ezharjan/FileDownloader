const axios = require("axios");
const path = require("path");
const fs = require("fs");


async function downloadFile(url, filePath = "downloadedFiles") {

    !fs.existsSync(filePath) && fs.mkdirSync(filePath);

    const urlSpecies = url.split("/");
    const fileName = decodeURI(urlSpecies[urlSpecies.length - 1]); //use decodeURI to get Chinese fileName 
    console.log("fileName is: " + fileName);
    const myPath = path.resolve(filePath, fileName);
    const writer = fs.createWriteStream(myPath);

    let response = await axios({
        url: url,
        method: "GET",
        responseType: "stream",
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finished;", resolve);
        writer.on("error occurred;", reject);
    });
}


const multipleDownload = async function (urls) {
    for (let i = 0; i < urls.length; i++) {
        await downloadFile(urls[i]);
        console.log((i + 1) + " has been one!");
    }
}



const m_urls = [
    "http://img.kaikeba.com/11%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Brecordaccumulator%E5%B0%81%E8%A3%85%E6%B6%88%E6%81%AF%E6%B5%81%E7%A8%8B%E5%88%9D%E6%8E%A2%281%29.mp4",
    "http://img.kaikeba.com/11%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Brecordaccumulator%E5%B0%81%E8%A3%85%E6%B6%88%E6%81%AF%E6%B5%81%E7%A8%8B%E5%88%9D%E6%8E%A2%282%29.mp4",
    "http://img.kaikeba.com/12%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bcopyonwritemap%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%BD%BF%E7%94%A8.mp4",
    "http://img.kaikeba.com/13%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%86%99%E5%88%B0%E5%AF%B9%E5%BA%94%E6%89%B9%E6%AC%A1%28%E5%88%86%E6%AE%B5%E5%8A%A0%E9%94%81%29.mp4",
    "http://img.kaikeba.com/14%20%E7%94%9F%E4%BA%A7%E8%80%85%E4%B9%8B%E5%86%85%E5%AD%98%E6%B1%A0%E8%AE%BE%E8%AE%A1.mp4",
    "http://img.kaikeba.com/15%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bsender%E7%BA%BF%E7%A8%8B%E8%BF%90%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%88%9D%E6%8E%A2.mp4",
    "http://img.kaikeba.com/16%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E4%B8%80%E4%B8%AAbatch%E4%BB%80%E4%B9%88%E6%9D%A1%E4%BB%B6%E4%B8%8B%E5%8F%AF%E4%BB%A5%E5%8F%91%E9%80%81%EF%BC%9F.mp4",
    "http://img.kaikeba.com/17%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%B8%85%E9%80%89%E5%8F%AF%E4%BB%A5%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E7%9A%84broker%281%29.mp4",
    "http://img.kaikeba.com/17%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E7%AD%9B%E9%80%89%E5%8F%AF%E4%BB%A5%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E7%9A%84broker%282%29.mp4",
    "http://img.kaikeba.com/18%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bkafka%E7%BD%91%E7%BB%9C%E8%AE%BE%E8%AE%A1%281%29.mp4",
    "http://img.kaikeba.com/18%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bkafka%E7%BD%91%E7%BB%9C%E8%AE%BE%E8%AE%A1-%E9%94%99%E8%AF%AF%E6%9B%B4%E6%AD%A3%282%29.mp4",
    "http://img.kaikeba.com/18%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bkafka%E7%BD%91%E7%BB%9C%E8%AE%BE%E8%AE%A1%283%29.mp4",
    "http://img.kaikeba.com/19%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%A6%82%E6%9E%9C%E7%BD%91%E7%BB%9C%E6%B2%A1%E6%9C%89%E5%BB%BA%E7%AB%8B%E5%A5%BD%E4%BC%9A%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E5%90%97%EF%BC%9F.mp4",
    "http://img.kaikeba.com/20%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E7%BB%88%E4%BA%8E%E8%A6%81%E4%B8%8Ebroker%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5%E4%BA%86%21%281%29.mp4",
    "http://img.kaikeba.com/20%20%E7%94%9F%E6%88%90%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E7%BB%88%E4%BA%8E%E8%A6%81%E4%B8%8Ebroker%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5%E4%BA%86%21%EF%BC%882%EF%BC%89.mp4",
    "http://img.kaikeba.com/20%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E7%BB%88%E4%BA%8E%E8%A6%81%E4%B8%8Ebroker%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5%E4%BA%86%EF%BC%81%283%29.mp4",
    "http://img.kaikeba.com/21%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E7%94%9F%E4%BA%A7%E8%80%85%E7%BB%88%E4%BA%8E%E5%8F%AF%E4%BB%A5%E5%8F%91%E9%80%81%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82%E4%BA%86%EF%BC%81%EF%BC%81%EF%BC%881%EF%BC%89.mp4",
    "http://img.kaikeba.com/21%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E7%94%9F%E4%BA%A7%E8%80%85%E7%BB%88%E4%BA%8E%E5%8F%AF%E4%BB%A5%E5%8F%91%E9%80%81%E8%AF%B7%E6%B1%82%E4%BA%86%EF%BC%81%EF%BC%81%282%29.mp4",
    "http://img.kaikeba.com/22%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E6%98%AF%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E7%B2%98%E5%8C%85%E9%97%AE%E9%A2%98%E7%9A%84%281%29.mp4",
    "http://img.kaikeba.com/22%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E6%98%AF%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E7%B2%98%E5%8C%85%E9%97%AE%E9%A2%98%E7%9A%84%282%29.mp4",
    "http://img.kaikeba.com/23%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8Bproducer%E6%98%AF%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E6%8B%86%E5%8C%85%E9%97%AE%E9%A2%98%E7%9A%84.mp4",
    "http://img.kaikeba.com/24%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E6%9A%82%E5%AD%98%E7%8A%B6%E6%80%81%E7%9A%84%E5%93%8D%E5%BA%94.mp4",
    "http://img.kaikeba.com/25%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%93%8D%E5%BA%94%E6%B6%88%E6%81%AF.mp4",
    "http://img.kaikeba.com/26%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E6%B6%88%E6%81%AF%E5%8F%91%E9%80%81%E5%AE%8C%E4%BA%86%E4%BB%A5%E5%90%8E%E5%86%85%E5%AD%98%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86.mp4",
    "http://img.kaikeba.com/27%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E6%B6%88%E6%81%AF%E6%9C%89%E5%BC%82%E5%B8%B8%E6%98%AF%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E7%9A%84.mp4",
    "http://img.kaikeba.com/28%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E8%B6%85%E6%97%B6%E7%9A%84%E6%89%B9%E6%AC%A1.mp4",
    "http://img.kaikeba.com/29%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E9%95%BF%E6%97%B6%E9%97%B4%E6%B2%A1%E6%9C%89%E6%8E%A5%E5%8F%97%E5%88%B0%E5%93%8D%E5%BA%94%E7%9A%84%E6%B6%88%E6%81%AF.mp4",
    "http://img.kaikeba.com/30%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E4%B9%8B%E7%94%9F%E4%BA%A7%E8%80%85%E6%BA%90%E7%A0%81%E7%B2%BE%E5%8D%8E%E6%80%BB%E7%BB%93.mp4"
];

multipleDownload(m_urls);