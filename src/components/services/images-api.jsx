function fetchImages(searchQuery, fetchPage) {
  const baseUrl = 'https://pixabay.com/api/';
  const key = '24488869-ab3c2489f9260f0be3e523737';
  const url = `${baseUrl}?q=${searchQuery}&page=${fetchPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет картинки с именем ${searchQuery}`));
  });
}

export default fetchImages;
