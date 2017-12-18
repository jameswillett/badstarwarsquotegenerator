const axios = require('axios')

const main = async () => {
  const num = Math.floor(Math.random() * 80);
  try {

    const [person1, person2, person3, ship, planet, species, firstRes] = await Promise.all([
      axios.get(`http://swapi.co/api/people/${Math.floor(Math.random() * 86) + 1}`),
      axios.get(`http://swapi.co/api/people/${Math.floor(Math.random() * 86) + 1}`),
      axios.get(`http://swapi.co/api/people/${Math.floor(Math.random() * 86) + 1}`),
      axios.get(`http://swapi.co/api/starships/${Math.floor(Math.random() * 37) + 1}`),
      axios.get(`http://swapi.co/api/planets/${Math.floor(Math.random() * 60) + 1}`),
      axios.get(`http://swapi.co/api/species/${Math.floor(Math.random() * 35) + 1}`),
      axios.get('http://foaas.com/operations')
    ])

    if (firstRes.data[num].url == ('/version' || '/operations') ||
        /:reaction/.test(firstRes.data[num].url) ||
        /:behavior/.test(firstRes.data[num].url)) return main()

    const newUrl = firstRes.data[num].url
      .replace(/:from/,person1.data.name)
      .replace(/:name/,person2.data.name)
      .replace(/:company/,ship.data.manufacturer)
      .replace(/:tool/,ship.data.model)
      .replace(/:do/,'Fuck')
      .replace(/:something/,ship.data.name)
      .replace(/:reference/,person3.data.name)
      .replace(/:noun/,planet.data.name)
      .replace(/:thing/,ship.data.name)
      .replace(/:language/,species.data.language)

    const [ secondRes, chuck ] = await Promise.all([
      axios.get(`http://foaas.com${newUrl}`),
      axios.get('https://api.chucknorris.io/jokes/random')
    ])
    console.log(`\n${secondRes.data.message}\n\t${secondRes.data.subtitle}\n`)
    console.log(`${chuck.data.value.replace(/chuck\ norris/ig, person3.data.name)}\n`)
  } catch (err) {
    return main()
  }
}

main()
