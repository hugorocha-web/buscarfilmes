const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTAyZjBkNDNlYzU4NjIyZTZkNmQzMjExMGMzOTY1ZCIsIm5iZiI6MTc4ODgxMDg0NS4xNDUsInN1YiI6IjZhOWYxNjVkMGZmMWI4NzZmOTdkNTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bBT4Ks0PL5sAaF-KUS7Y67UdOIqFG0h3i7nOs4AQO5c'
const chaveapi = '3902f0d43ec58622e6d6d32110c3965d'
let btn = document.querySelector('button')
btn.addEventListener('click', buscarfilme)
let clonado = document.querySelector('#cartaz')
let main  = document.querySelector('main')

async function buscarfilme() {
    main.style.display = 'flex'
    main.innerHTML = ""
    let valor = document.querySelector('input').value.toLowerCase().trim()
    if(valor === ''){
        return none
    }
    try{
        const resposta = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${valor}&language=pt-BR`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }
    )
        let json = await resposta.json()
        const generos = {
            28: "Ação",
            12: "Aventura",
            16: "Animação",
            35: "Comédia",
            80: "Crime",
            99: "Documentário",
            18: "Drama",
            10751: "Família",
            14: "Fantasia",
            36: "História",
            27: "Terror",
            10402: "Música",
            9648: "Mistério",
            10749: "Romance",
            878: "Ficção científica",
            10770: "Cinema TV",
            53: "Thriller",
            10752: "Guerra",
            37: "Faroeste"
        }
        
        console.log(json.results)
        for ( let i = 0; json.results.length > i ; i++){


            let clone = clonado.cloneNode(true)
            let img  = 'https://image.tmdb.org/t/p/w500' + json.results[i].backdrop_path
            console.log(img)
            clone.querySelector('#nomefilme').textContent = json.results[i].original_title
            clone.querySelector('#anofilme').textContent = json.results[i].release_date
            clone.querySelector('#pnota').textContent = json.results[i].vote_average
            let imgclone = clone.querySelector('img')
            if (json.results[i].backdrop_path !== null) {
                 imgclone.src = img
            }
            else{
                imgclone.src = 'images-not-found.jpg'
            }
            
            clone.style.display = 'flex'
            let nomesGeneros = json.results[i].genre_ids.map(id => generos[id])
            let finalgen = nomesGeneros.join(" • ")
            clone.querySelector('#coisas').textContent = finalgen
            console.log(nomesGeneros)
            main.appendChild(clone)


        }
        


    }
    catch(error){
        console.log(error)
    };
    
}