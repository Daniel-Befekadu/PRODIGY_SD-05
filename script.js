document.getElementById('scrapeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const url = document.getElementById('url').value;

    try {
        const response = await fetch(`/scrape?url=${encodeURIComponent(url)}`);
        const products = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (products.length > 0) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Rating: ${product.rating}</p>
                `;
                resultsDiv.appendChild(productDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No products found.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});