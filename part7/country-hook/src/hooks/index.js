import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const fetchDataCall = async ({ api }) => {
  let apiReturn = await axios
    .get(api)
    .then(async (response) => {
      return response
    })
    .catch((error) => {
      console.log(`Error in data fetch: ${error}`)
    })
  return apiReturn
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchData = async (api) => {
      let response = await fetchDataCall({ api: api })
      setCountry(response)
      // console.log(response)
    }
    if (!name) return

    fetchData(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
  }, [name])

  // useEffect(() => {
  //   if (name) {
  //     axios
  //       .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
  //       .then((response) => {
  //         setCountry(response.data[0])
  //       })
  //       .catch((error) => {
  //         setCountry(null)
  //       })
  //   }
  // }, [name])

  return country
}

export { useField, useCountry }
