import { useEffect, useState } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';

const BeveragesFuture = () => {
  document.title = "DEF Future Beverages"

  const [sortedData, setSortedData] = useState([])
    const [search, setSearch] = useState('')
    const dataBaseUrl = import.meta.env.VITE_DATA_BASE_URL + 'beverages.json'

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(dataBaseUrl)
          const jsonData = await response.json()
          const sortedDataKey = jsonData.filter(item => 
            item.temptitle
          );
          const sortedData = [...sortedDataKey].sort((a, b) => a.temptitle.localeCompare(b.temptitle))
          setSortedData(sortedData)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      };
      fetchData();
    }, []);

    const filteredData = sortedData.filter(item => {
      return item.temptitle.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.ingredients.some(e => e.toLowerCase().includes(search.toLowerCase()))
    })

    return ( 
        <>
            <div id="beverages-future">
              <h1>The DEF Future Beverages Bar</h1>
              <h5>Warning: Some recipes here are more refined than others. Some are just the start of ideas. Be wary.</h5>
              <TextField
                  id="textfield-search"
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              {filteredData
                  .map((item, index) => (
                  <Card 
                      key={index}
                      title={item.temptitle}
                      refined={item.refined}
                      equipment={item.equipment}
                      ingredients={item.ingredients}
                      directions={item.directions}
                      notes={item.notes}
                      category={item.category}
                  />
              ))}
          </div>
        </>
    )
}

export default BeveragesFuture;