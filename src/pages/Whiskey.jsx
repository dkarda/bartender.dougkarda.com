import { useEffect, useState, useRef } from 'react';
import Card from '../components/Card';
import TextField from '../components/TextField';

const Whiskey = () => {
    document.title = "DEF Whisk(e)y"

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [activeContent, setActiveContent] = useState('')
    const dialogRef = useRef()
    const dataBaseUrl = import.meta.env.VITE_DATA_BASE_URL + 'liquor-inventory.json';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(dataBaseUrl);
            const jsonData = await response.json();
            setData(jsonData);
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

    useEffect(() => {
        if (!activeContent) return
        dialogRef.current.showModal()
        document.body.style.overflow='hidden'

        dialogRef.current.addEventListener('close', closeModal)
        //document.body.addEventListener('keydown', handleKeyDown)
        return(() => {
            dialogRef.current.removeEventListener('close', closeModal)
            //document.body.removeEventListener('keydown', handleKeyDown)
        })
    }, [activeContent])

    function closeModal() {
        dialogRef.current.close()
        setActiveContent('')
        document.body.style.overflow=''
    }

    function handleKeyDown(e) {
        if (e.key === 'LeftArrow') {

        } else if (e.key === 'RightArrow') {

        }
    }

    const filteredData = data.filter(item => 
        (item.category === 'scotch' ||
        item.category === 'irish' ||
        item.category === 'rye' ||
        item.category === 'bourbon' ||
        item.category === 'americanwhiskey' ||
        item.category === 'canadianwhiskey' ||
        item.category === 'japanesewhiskey' ||
        item.category === 'australianwhiskey' ||
        item.category === 'flavorednwhiskey') &&
        item.count > 0
     );

    return (
        <>
            <div id="whiskey">
                <h1>The DEF Whiskey List</h1>
                <TextField
                    id="name"
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <dialog data-dialog ref={dialogRef}>
                    <button className="close-button" onClick={closeModal}>X</button>
                    <Card 
                        img={"https://assets.dougkarda.com/images/liquors/" + activeContent.img}
                        titleDialog={activeContent.title}
                        size={activeContent.size}
                        locale={activeContent.locale}
                        type={activeContent.type}
                        abv={activeContent.abv}
                    />
                </dialog>
                {filteredData
                    .filter((item) => {
                        return search.toLowerCase() === '' ? item : 
                            item.title.toLowerCase().includes(search.toLowerCase()) ||
                            item.type.toLowerCase().includes(search.toLowerCase()) ||
                            item.locale.toLowerCase().includes(search.toLowerCase())
                            ;
                    })
                    .map((item, index) => (
                    <button className="button-card" onClick={() => setActiveContent(item, index)}>
                    <Card 
                        key={index}
                        img={"https://assets.dougkarda.com/images/liquors/" + item.img}
                        title={item.title}
                        type={item.type}
                    />
                    </button>
                ))}
            </div>
        </>
    )
}

export default Whiskey;