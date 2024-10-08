const { response } = require('express');
const { link } = require('fs');
const { request } = require('http');

const app = require('express')();
const cheerio = require("cheerio");
const axios = require("axios");


function getNewsInfo(AXIOS_OPTIONS) {
    return axios
        .get(`http://google.co.in/search`, AXIOS_OPTIONS)
        .then(function ({ data }) {
            let $ = cheerio.load(data);

            const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
            const images = [...data.matchAll(pattern)].map(({ groups }) => ({ id: groups.id, img: groups.img.replace('\\x3d', '') }))

            const allNewsInfo = Array.from($('.WlydOe')).map((el) => {
                return {
                    link: $(el).attr('href'),
                    date: $(el).find('.ZE0LJd span').text().trim(),
                }
            });

            return allNewsInfo;
        });
}



app.get('/name', (request, Response) =>{
    const searchString = "modi";                   
const encodedString = encodeURI(searchString);      

const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },                                                  
    params: {
        q: encodedString,                                  
        tbm: "nws",                                     
        hl: 'en',                                       
        gl: 'in'   
       
              
                                 
    },
};
    getNewsInfo(AXIOS_OPTIONS).then(data=>console.log(data));
    //response.status(200).send({
     //   name: ' '
   // })
});
app.post('/nam', (request,response) => {
    const{name} = request.body;
  

    response.send({
        X:`${date}`,
        Y:`${link}`,
    })
});