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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [finishedGames, setFinishedGames] = useState(new Map());

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
          });
    } catch(error){
      console.log(error.response.data);
    }
  }, []);

  const handleSetResult = async (game_id, result) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/games/set-result/${game_id}`, {
        result: result,
        game_status: 'FINISHED'
      });

      if(response.data.status === 'ok') {
        const updatedGame = {
          ...betsList[game_id],
          result: result,
          game_status: 'FINISHED'
        };

        setFinishedGames(prev => new Map(prev).set(game_id, updatedGame));
        setBetsList(prev => ({
          ...prev,
          [game_id]: updatedGame
        }));
      }
    } catch (error) {
      console.error('Error setting result:', error);
    }
  };

  const handleAddGame = () => {
    setShowModal(false);

    const data = {
      home: formData.team1,
      away: formData.team2,
      event_name: formData.event_name,
      start_time: formData.start_date.concat(' ', formData.start_time).concat('', ":00"),
      sport_type: formData.category,
      odds1: formData.kurs1,
      odds2: formData.kurs2,
      oddsX: ((formData.kursX) ? formData.kursX: null)
    }

    axios.post("http://localhost:8000/api/games/", data).then(res => {
      if (selectedEvent === data.event_name) {
        handleSelectEvent(selectedCategory, selectedEvent);
      }
    }).catch(err => {
      console.error(err);
    })

    setFormData({});
  };

  const handleSelectEvent = async (category, event) => {
    setSelectedCategory(category);
    setSelectedEvent(event);

    try {
      const response = await axios.get(`http://localhost:8000/api/games/${event}`);
      const newBetsList = response.data.data;

      // Restore finished games that might not be in API response
      finishedGames.forEach((game, id) => {
        if (game.event_name === event) {
          newBetsList[id] = game;
        }
      });

      setBetsList(newBetsList);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const getResultDisplay = (betData) => {
    if (!betData.result) return '-';
    if (betData.result === 'One') return `Wygrana: ${betData.home}`;
    if (betData.result === 'Two') return `Wygrana: ${betData.away}`;
    return 'Remis';
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
                  <Dropdown key={category} drop="end" autoClose="outside">
                    <Dropdown.Toggle className="dropdown-item">
                      {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {events.map((event) => (
                          <Dropdown.Item
                              key={event}
                              onClick={() => handleSelectEvent(category, event)}
                          >
                            {event}
                          </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <h1 className="d-flex justify-content-center">
          {selectedCategory} {selectedCategory && '-'} {selectedEvent}
        </h1>

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
            <th>Wynik</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(betsList).map(([key, betData]) => (
              <tr key={key}>
                <td><b>{betData.home}</b> vs <b>{betData.away}</b></td>
                <td>{betData.start_date}</td>
                <td>{betData.start_time}</td>
                <td>{betData.odds1}</td>
                <td>{betData.odds2}</td>
                <td>{betData.oddsX}</td>
                <td>{betData.game_status}</td>
                <td>{getResultDisplay(betData)}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                        variant="primary"
                        size="sm"
                        disabled={betData.game_status === 'FINISHED'}
                    >
                      Ustaw Wynik
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSetResult(key, 'One')}>
                        Zwycięstwo {betData.home}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSetResult(key,'X')}>
                        Remis
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSetResult(key, 'Two')}>
                        Zwycięstwo {betData.away}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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

export default ManageGames