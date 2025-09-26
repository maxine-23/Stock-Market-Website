$(document).ready(function() {
    const topGainersData = [
        { symbol: 'TSLA', price: 215.45, change: 4.51, changePercent: 2.14 },
        { symbol: 'NVDA', price: 875.10, change: 15.20, changePercent: 1.76 },
        { symbol: 'GOOG', price: 172.95, change: 1.50, changePercent: 0.88 },
        { symbol: 'AMZN', price: 185.00, change: 1.05, changePercent: 0.57 }
    ];

    const topLosersData = [
        { symbol: 'AAPL', price: 170.34, change: -1.24, changePercent: -0.73 },
        { symbol: 'MSFT', price: 420.50, change: -2.30, changePercent: -0.54 },
        { symbol: 'NFLX', price: 605.00, change: -1.50, changePercent: -0.25 },
        { symbol: 'CRM', price: 235.00, change: -0.80, changePercent: -0.34 }
    ];

    const watchlistData = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.24, changePercent: 0.73 },
        { symbol: 'GOOG', name: 'Alphabet Inc.', price: 172.95, change: -1.50, changePercent: -0.88 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 215.45, change: 4.51, changePercent: 2.14 },
    ];

    const newsData = [
        { title: 'Tech Stocks Rebound as Inflation Fears Ease', source: 'MarketWire', date: '2 hours ago' },
        { title: 'Tesla Announces New Battery Technology', source: 'Tech News', date: '5 hours ago' },
        { title: 'Apple Q2 Earnings Beat Expectations', source: 'Financial Times', date: '1 day ago' },
    ];

    function renderMarketMovers(containerId, data, isGainer) {
    const $container = $('#' + containerId);

        $container.empty();
        data.forEach(item => {
            const changeClass = isGainer ? 'text-success' : 'text-danger';
            const changeSign = isGainer ? '+' : '';
            const listItem = `
                <li class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="fw-semibold mb-0">${item.symbol}</p>
                        <small class="text-secondary">${item.name || ''}</small>
                    </div>
                    <div class="text-end">
                        <p class="mb-0">${item.price.toFixed(2)}</p>
                        <small class="${changeClass}">${changeSign}${item.change.toFixed(2)} (${changeSign}${item.changePercent.toFixed(2)}%)</small>
                    </div>
                </li>
            `;
            $container.append(listItem);
        });
    }

    function renderWatchlist() {
        const $watchlistContainer = $('#watchlist');
        $watchlistContainer.empty();
        watchlistData.forEach(item => {
            const changeClass = item.change >= 0 ? 'text-success' : 'text-danger';
            const changeSign = item.change >= 0 ? '+' : '';
            const cardItem = `
                <div class="col-lg-4 col-md-6">
                    <div class="card rounded-3 shadow-sm p-3">
                        <h6 class="fw-bold mb-0">${item.symbol}</h6>
                        <small class="text-secondary mb-2">${item.name}</small>
                        <p class="fs-5 mb-0">${item.price.toFixed(2)}</p>
                        <small class="${changeClass}">${changeSign}${item.change.toFixed(2)} (${changeSign}${item.changePercent.toFixed(2)}%)</small>
                    </div>
                </div>
            `;
            $watchlistContainer.append(cardItem);
        });
    }

    function renderNewsFeed() {
        const $newsContainer = $('#news-feed');
        $newsContainer.empty();
        newsData.forEach(item => {
            const newsItem = `
                <div class="col-lg-4">
                    <div class="card p-3 news-item rounded-3 shadow-sm">
                        <p class="fw-semibold mb-1">${item.title}</p>
                        <small class="text-secondary">${item.source} - ${item.date}</small>
                    </div>
                </div>
            `;
            $newsContainer.append(newsItem);
        });
    }

    function renderChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        const data = [170.34, 172.50, 168.90, 175.20, 173.40, 176.10, 174.50, 178.90, 180.20];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    renderMarketMovers('top-gainers', topGainersData, true);
    renderMarketMovers('top-losers', topLosersData, false);
    renderWatchlist();
    renderNewsFeed();
    renderChart();
});