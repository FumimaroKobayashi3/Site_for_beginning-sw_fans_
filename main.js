const form = document.getElementById('search-form')
const inp = document.getElementById('search-input')
const submit = document.getElementById('submit')
const disp = document.getElementById('status-display')
const cat = document.getElementById('category-select')
const list = document.getElementById('results-list')

form.addEventListener(('submit'), async (event) => {
    event.preventDefault()

    list.innerHTML = ''
    disp.textContent = ""

    const quer = inp.value.trim()
    const cat_sel = cat.value

    if (!quer){
        disp.textContent = "ВНИМАНИЕ ОШИБКА, ВЫ НЕ ВВЕЛИ ЗАПРОС"
        return
    }
    await fetchdat(cat_sel, quer) 

})

async function fetchdat (cat_sel, quer) {
    disp.textContent = "СКАНИРОВАНИЕ ГАЛАКТИКИ"
    try {
        const res = await fetch(`https://swapi.dev/api/${cat_sel}/?search=${quer}`)
        if (!res.ok) {
            disp.textContent = "ОШИБКА СВЯЗЬ ПРЕРВАНА"
            return
        }
        const dat = await res.json()
        const filter = dat.results.filter(element => {
    
            const age = parseInt(element.birth_year)
            return age > 29
        })

        if (dat.results.length === 0){
            disp.textContent = "ОБЪЕКТ НЕ НАЙДЕН В БАЗЕ ДАННЫХ"
        } else {
            disp.textContent = ''
            renderResults(filter, cat_sel) 
        }
         renderResults(dat.results, cat_sel)
    } catch (error) {
        disp.textContent = "ОШИБКА СВЯЗЬ ПРЕРВАНА"
    }
}

function renderResults(it, cat_sel) {

    it.forEach(element => {
        const li = document.createElement('li')
        

        if (cat_sel === 'people'){
            li.innerHTML = 
            `
            <strong>ИМЯ:</strong> ${element.name} <br>
            <strong>ПОЛ:</strong> ${element.gender} <br>
            <strong>ВОЗРАСТ:</strong> ${element.birth_year} <br>
            <strong>РОСТ:</strong> ${element.height}
            `
            
        } else if (cat_sel === 'planets'){
            li.innerHTML = `
            <strong>НАЗВАНИЕ:</strong> ${element.name} <br>
            <strong>НАСЕЛЕНИЕ:</strong> ${element.population}
            `
        }

        list.appendChild(li)
    });
}
