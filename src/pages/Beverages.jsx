import { useEffect, useState, useRef } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';

const Beverages = () => {
    document.title = "DEF Beverages"

    const [sortedData, setSortedData] = useState([]);
    const [search, setSearch] = useState('');
    const [activeContent, setActiveContent] = useState('')
    const dialogRef = useRef()
    const dataBaseUrl = import.meta.env.VITE_DATA_BASE_URL + 'beverages.json';

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(dataBaseUrl);
          const jsonData = await response.json();
          const sortedDataKey = jsonData.filter(item => 
            item.title
          );
          const sortedData = [...sortedDataKey].sort((a, b) => a.title.localeCompare(b.title));
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
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.ingredients.some(e => e.toLowerCase().includes(search.toLowerCase()))
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
            <div id="beverages">
                <h1>The DEF Beverages Bar</h1>
                <TextField
                    id="textfield-search"
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="drink name, category, ingredient"
                />
                <dialog data-dialog ref={dialogRef}>
                    <button className="close-button" onClick={closeModal}>X</button>
                    <Card 
                        img={"https://assets.dougkarda.com/images/beverages/" + activeContent.img}
                        titleDialog={activeContent.title}
                        scoreDialog={activeContent.score}
                        maxScore="5"
                        equipment={activeContent.equipment}
                        ingredients={activeContent.ingredients}
                        directions={activeContent.directions}
                        notes={activeContent.notes}
                    />
                </dialog>
                {filteredData
                    .map((item, index) => (
                    <button className="button-card" onClick={() => setActiveContent(item, index)}>
                    <Card 
                        key={index}
                        img={"https://assets.dougkarda.com/images/beverages/" + item.img}
                        title={item.title}
                        score={item.score}
                        maxScore="5"
                    />
                    </button>
                ))}
            </div>
        </>
    )
}

export default Beverages;