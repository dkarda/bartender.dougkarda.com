import { useEffect, useState, useRef } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';

const Liquor = () => {
    document.title = "DEF Wines"

    const [sortedData, setSortedData] = useState([]);
    const [search, setSearch] = useState('');
    const [activeContent, setActiveContent] = useState('')
    const dialogRef = useRef()
    const dataBaseUrl = import.meta.env.VITE_DATA_BASE_URL + 'wine-inventory.json';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(dataBaseUrl);
            const jsonData = await response.json();
            const sortedDataKey = jsonData.filter(item => 
                item.producer
            );
            const sortedData = [...sortedDataKey].sort((a, b) => a.producer.localeCompare(b.producer));
            setSortedData(sortedData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();

        const dialogEl = document.querySelector('[data-dialog]')
        dialogEl.addEventListener('click', e => {
            const dialogDimensions = dialogEl.getBoundingClientRect()
            if (e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom) {
                    closeModal();
                }
        })    
      }, []);

      const filteredData = sortedData.filter(item => {
        return item.count > 0 &&
            (item.producer.toLowerCase().includes(search.toLowerCase()) ||
            item.locale.toLowerCase().includes(search.toLowerCase()) ||
            item.type.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()))
      })

      useEffect(() => {
        if (!activeContent) return
        dialogRef.current.showModal()
        document.body.style.overflow='hidden'

        dialogRef.current.addEventListener('close', closeModal)
        return(() => {
            dialogRef.current.removeEventListener('close', closeModal)
        })
    }, [activeContent])

    function closeModal() {
        dialogRef.current.close()
        setActiveContent('')
        document.body.style.overflow=''
    }

    return ( 
        <>
          <div id="liquor">
              <h1>The DEF Wine List</h1>
              <TextField
                  id="name"
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <dialog data-dialog ref={dialogRef}>
                  <button className="close-button" onClick={closeModal}>X</button>
                  <Card 
                      img={"https://assets.dougkarda.com/images/wines/" + activeContent.img}
                      year={activeContent.year}
                      producer={activeContent.producer}
                      brand={activeContent.brand}
                      locale={activeContent.locale}
                      type={activeContent.type}
                      count={activeContent.count}
                  />
              </dialog>
              {filteredData
                  .map((item, key) => (
                  <button className="button-card" onClick={() => setActiveContent(item, key)}>
                  <Card 
                      key={key}
                      img={"https://assets.dougkarda.com/images/wines/" + item.img}
                      year={item.year}
                      producer={item.producer}
                      brand={item.brand}
                      type={item.type}
                      count={item.count}
                  />
                  </button>
              ))}
          </div>
        </>
    )
}

export default Liquor;