const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTAyZjBkNDNlYzU4NjIyZTZkNmQzMjExMGMzOTY1ZCIsIm5iZiI6MTc4ODgxMDg0NS4xNDUsInN1YiI6IjZhOWYxNjVkMGZmMWI4NzZmOTdkNTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bBT4Ks0PL5sAaF-KUS7Y67UdOIqFG0h3i7nOs4AQO5c'
const chaveapi = '3902f0d43ec58622e6d6d32110c3965d'
let btn = document.querySelector('button')
btn.addEventListener('click', buscarfilme)
let clonado = document.querySelector('#cartaz')
let main  = document.querySelector('main')
let input = document.querySelector('#inp')
let div = document.getElementById('divsem')
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buscarfilme()
    }
})
async function buscarfilme() {
    main.style.display = 'flex'
    main.innerHTML = ""
    let valor = document.querySelector('input').value.trim()
    valor = encodeURIComponent(valor)
    if(valor === ''){
        let clonesem = div.cloneNode(true)
        clonesem.style.display  = 'block'
        main.appendChild(clonesem)
        return
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
        if(json.results.length == 0){
            let clonesem = div.cloneNode(true)
            clonesem.style.display  = 'block'
            main.appendChild(clonesem)
            return
        }
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
        function ordenarListaPorChave(arr, chave, crescente = true) {
        

        if (!Array.isArray(arr)) {
            throw new Error("O primeiro parâmetro deve ser um array.");
        }
        if (arr.length === 0) return [];

        if (!(chave in arr[0])) {
            throw new Error(`A chave "${chave}" não existe nos objetos da lista.`);
        }

        return [...arr].sort((a, b) => {
            
            const valorA = a[chave];
            const valorB = b[chave];
            if (valorA === " " && valorB !== " ") return 1;

            
            if (valorB === " " && valorA !== " ") return -1;

            
            if (valorA === " " && valorB === " ") return 0;

            if (valorA < valorB) return crescente ? -1 : 1;
            if (valorA > valorB) return crescente ? 1 : -1;
            return 0;
        });
    }


        const ordenadoPorIdade = ordenarListaPorChave(json.results, "release_date", false);
        
        for ( let i = 0; ordenadoPorIdade.length > i ; i++){
            

            let clone = clonado.cloneNode(true)
            let img  = 'https://image.tmdb.org/t/p/w500' + ordenadoPorIdade[i].poster_path
            
            clone.querySelector('#nomefilme').textContent = ordenadoPorIdade[i].title
            clone.querySelector('#anofilme').textContent = ordenadoPorIdade[i].release_date
            clone.querySelector('#pnota').textContent = ordenadoPorIdade[i].vote_average
            let imgclone = clone.querySelector('img')
            if (ordenadoPorIdade[i].poster_path !== null) {
                 imgclone.src = img
            }
            else{
                imgclone.src = 'images-not-found.jpg'
            }
            
            clone.style.display = 'flex'
            let nomesGeneros = ordenadoPorIdade[i].genre_ids.map(id => generos[id]).filter(Boolean)
            let finalgen = nomesGeneros.join(" • ")
            clone.querySelector('#coisas').textContent = finalgen
            
            main.appendChild(clone)


        }
        


    }
    catch(error){
        console.log(error)
    };
    
}
