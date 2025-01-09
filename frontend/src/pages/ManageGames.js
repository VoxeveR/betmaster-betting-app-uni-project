import React, {useEffect, useState} from 'react';
import {Table, Button, Dropdown} from 'react-bootstrap';
import axios from "axios";
import CustomModal from '../components/CustomModal';

const ManageGames = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [betsList, setBetsList] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent,   setSelectedEvent] = useState(null);

  const gameFields = [
    { name: 'category', label: 'Kategoria', type: 'text', required: true },
    { name: 'team1', label: 'Drużyna domowa', type: 'text', required: true },
    { name: 'team2', label: 'Drużyna wyjazdowa', type: 'text', required: true },
    { name: 'event_name', label: 'Nazwa wydarzenia', type: 'text', required: true },
    { name: 'start_date', label: 'Data wydarzenia', type: 'date', required: true },
    { name: 'start_time', label: 'Godzina rozpoczęcia', type: 'time', required: true },
    { name: 'kurs1', label: 'Kurs [HOME WIN]', type: 'number', required: true },
    { name: 'kurs2', label: 'Kurs [AWAY WIN]', type: 'number', required: true },
    { name: 'kursX', label: 'Kurs [X] - Puste jeżeli nie obowiązuje', type: 'number', required: false },
  ];

  useEffect(()=>{
    try{
      axios.get('http://localhost:8000/api/games/categories')
          .then((response) => {
            setCategoryList(response.data.data);
            console.log(response.data.data);
          });
    } catch(error){
      console.log(error.response.data);
    }
  }, []);



  const handleAddGame = () => {
    setShowModal(false);

    const data = {
      home: formData.team1,
      away: formData.team2,
      event_name: formData.event_name,
      start_time: formData.start_date.concat(' ', formData.start_time).concat('', ":00"),
      sport_type: formData.category/*,
      start_date: formData.start_date,
      odds1: formData.kurs1,
      odds2: formData.kurs2,
      oddsX: formData.kursX*/
    }

    console.log("xd", data);

    axios.post("http://localhost:8000/api/games/", data).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
      console.log(err.detail);
    })

    console.log(formData);
    setFormData({});
    console.log(formData);
  };


  const handleSelectEvent = async (category, event) => {
    setSelectedCategory(category);
    setSelectedEvent(event);

    try {
      const response = await axios.get(`http://localhost:8000/api/games/${event}`);
      setBetsList(response.data.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  return (
      <div>
        <h2>Zarządzanie grami</h2>
        <div className="d-flex gap-2">
          <Button onClick={() => setShowModal(true)}>Dodaj nową grę</Button>
          <Dropdown>
            <Dropdown.Toggle variant="primary">
              {selectedCategory || 'Wybierz kategorię'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.entries(categoryList).map(([category, events]) => (
                  <>
                  <Dropdown key={category}  drop="end" autoClose="outside">
                    <Dropdown.Toggle className="dropdown-item">
                      {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {events.map((event) => (
                          <Dropdown.Item key={event}
                                         onClick={() => handleSelectEvent(category, event)}>
                            {event}
                          </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  </>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <h1 className={"d-flex justify-content-center"}>{selectedCategory} {selectedCategory && '-'} {selectedEvent}</h1>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Nazwa</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Kurs1</th>
            <th>Kurs2</th>
            <th>KursX</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(betsList).map(([key, betData]) => (
              <tr key={betData.id}>
                <td><b>{betData.home}</b> vs <b>{betData.away}</b></td>


                <td>{betData.start_date}</td>
                <td>{betData.start_time}</td>
                <td>{betData.odds1}</td>
                <td>{betData.odds2}</td>
                <td>{betData.oddsX}</td>
                <td></td>
                <td>
                  <Button variant="warning" size="sm">Edytuj</Button>{' '}
                  <Button variant="danger" size="sm">Usuń</Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title="Dodaj nową grę"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddGame}
            fields={gameFields}
        />
      </div>
  );
};

export default ManageGames;