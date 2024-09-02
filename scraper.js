const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/scrape', async (req, res) => {
    const url = req.query.url;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const products = [];

        $('.product').each((index, element) => {
            const name = $(element).find('.product-name').text().trim();
            const price = $(element).find('.product-price').text().trim();
            const rating = $(element).find('.product-rating').text().trim();

            products.push({ name, price, rating });
        });

        res.json(products);
    } catch (error) {
        res.status(500).send('Error scraping the website.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});