const api = {
  getArtwork: (page: number) => {
    return fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
  }
}

export default api