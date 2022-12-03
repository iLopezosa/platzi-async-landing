const API =
    'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLZFqYxxSYPDuuP6uJp5n9RKTn4xMrulEB&part=snippet&maxResults=20';

const content = null || document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b23ff17f50msh9b013d293e3c562p11a67bjsn9fb24a45d684',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(url) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = videos.items.map((video, i) => 
            `
            <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank">
              <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                  <img src="${video.snippet.thumbnails.medium.url}" alt="Chainsaw Man Ed.${i + 1}" class="w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                  <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                  </h3>
                </div>
              </div>
            </a>
            `
        ).join('');
        content.innerHTML = view;
    } catch (e) {
        alert(e);
        console.error(e);
    }
})();
