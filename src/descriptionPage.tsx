import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import Breadcrumbs from './breadcrumbs';
import { Offcanvas } from 'react-bootstrap';

// Мок-данные для мероприятий
const mockEvents = [
  {
    pk: 1,
    event_name: 'Выставка робототехники',
    event_type: 'Выставка',
    duration: '2 часа',
    description: 'Описание выставки',
    img_url: null,
  },
  {
    pk: 2,
    event_name: 'Лекция по искусственному интеллекту',
    event_type: 'Лекция',
    duration: '1.5 часа',
    description: 'Описание лекция',
    img_url: null,
  },
  {
    pk: 3,
    event_name: 'Мастер-класс по программированию',
    event_type: 'Мастер-класс',
    duration: '3 часа',
    description: 'Описание мастер-класса',
    img_url: null,
  },
];

const defaultImageUrl = '/events-app/mock_img/8.png';

const EventDescription = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const [error, setError] = useState(null); // Для обработки ошибок
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}/`);

        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных мероприятия');
        }

        const eventData = await response.json();
        setEvent(eventData);
      } catch (err) {
        // Используем мок-данные, если произошла ошибка
        const mockEvent = mockEvents.find(item => item.pk === parseInt(eventId, 10));

        if (mockEvent) {
          setEvent(mockEvent);
        } 
        else {
          setError('Мероприятие не найдено');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Обработка состояния загрузки и ошибок
  if (loading) {
    return <div className="text-center my-5">Загрузка данных мероприятия...</div>;
  }

  if (error) {
    return <div className="text-danger text-center my-5">Ошибка: {error}</div>;
  }

  // Если данные мероприятия загружены
  return (
    <div>
      {/* Шапка */}
      <div className='menu'>
        <Link to="/">
          <div className="bmstu">
              <div className="bmstu-image"><img src="/events-app/mock_img/bmstu.png"/></div>
              <div className="bmstu-line"></div>
              <div className="bmstu-text">МОСКОВСКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ ИМ Н. Э. БАУМАНА</div>
          </div>
        </Link>
        <Navbar />
      </div>
      <div className='menu__mobile'>
        {/* BMSTU Logo Section */}
        <div className="burger-menu" onClick={handleShow}>
        ☰
        </div>
        
        {/* Offcanvas Navigation */}
        <Offcanvas show={show} onHide={handleClose} placement="start" className="text-light" style={{color:"#ffffff"}}> {/* Changed background */}
          <Offcanvas.Header closeButton className="border-0" style={{backgroundColor:"#006CDC"}}> {/* Added border-0 */}
            <Offcanvas.Title className="text-light mx-3 fs-2" style={{margin:"0.5em 1em"}}>Навигация</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="" style={{backgroundColor:"#006CDC"}}> {/* Changed background */}
            <Navbar></Navbar>
            <div className="bmstu">
              <div className="bmstu-image"><img src="/events-app/mock_img/bmstu-white.png"/></div>
              <div className="bmstu-line"></div>
              <div className="bmstu-text">МОСКОВСКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ ИМ Н. Э. БАУМАНА</div>
          </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    
      <div className="container">
      <Breadcrumbs></Breadcrumbs>
      <div className="event-card-long row my-4" key={event.event_name} style={{minHeight:'14em', margin: '0 auto' }}>
        <div className="event-card-long-text col-md-8" style={{margin:'0', padding: '2em' }}>
          <h1>{event.event_name}</h1>
          <p>{event.event_type}</p>
          <p>{event.duration}</p>
          <p>{event.description}</p>
        </div>
              
        {/* Изображение - 40% ширины */}
        <div className="event-card-long-img col-md-4" style={{padding:'0'}}>
          <img
            src={event.img_url || defaultImageUrl}
            alt={event.event_name}
            style={{ width: '100%', objectFit: 'cover',borderTopRightRadius:'10px', borderBottomRightRadius: '10px' }}
          />
        </div>
      </div>

      <div className="event-card-long__mobile row my-4" key={event.event_name} style={{minHeight:'14em', margin: '0 auto' }}>
        {/* Изображение - 40% ширины */}
        <div className="event-card-long-img col-md-4" style={{padding:'0'}}>
          <img
            src={event.img_url || defaultImageUrl}
            alt={event.event_name}
            style={{ width: '100%', objectFit: 'cover',borderTopRightRadius:'10px', borderBottomRightRadius: '10px' }}
          />
        </div>
        
        <div className="event-card-long-text col-md-8" style={{margin:'0', padding: '2em' }}>
          <h1>{event.event_name}</h1>
          <p>{event.event_type}</p>
          <p>{event.duration}</p>
          <p>{event.description}</p>
        </div>
      </div>
      </div>
      </div>
  );
};

export default EventDescription;