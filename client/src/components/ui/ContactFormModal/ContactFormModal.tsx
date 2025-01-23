import React, { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import CloseIcon from '@mui/icons-material/Close';
import useFeedback from '../../../hooks/useFeedback';
import styles from './ContactFormModal.module.css';
import type { AppartmentTypeDb } from '../../../types/appartmentTypes';

type ContactFormModalProps = {
  show: boolean;
  onHide: () => void;
  oneApartment?: AppartmentTypeDb;
}


function ContactFormModal({ show, onHide, oneApartment }: ContactFormModalProps): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (oneApartment) {
      setMessage(`Меня интересует квартира №${oneApartment.id} в доме №${oneApartment.buildingId}`);
    } else {
      setMessage('');
    }
  }, [oneApartment]);

  const { submitHandler } = useFeedback();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (phone.length >= 11) {
      submitHandler(e);
      onHide();
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    if (phone.length === 0 && !value.startsWith('7') && value.length > 0) {
      setPhone(`7${value.substring(1)}`);
    } else {
      setPhone(value);
    }
  };

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <Box className={styles.header}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.title}>
            Заполните форму
          </Typography>
          <IconButton onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ваше имя"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            type="email"
            name="email"
            label="Ваш email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ReactPhoneInput
            inputStyle={{ padding: '0' }}
            country="ru"
            value={phone}
            onChange={handlePhoneChange}
            component={TextField}
            isValid={(value: string) =>
              isSubmitted ? value.length === 11 || 'Введите не менее 11 символов' : true
            }
            inputProps={{
              name: 'phone',
              label: 'Ваш номер телефона',
              required: true,
              fullWidth: true,
              variant: 'outlined',
              margin: 'normal',
            }}
          />
          <TextField
            name="message"
            label="Ваше сообщение"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={oneApartment ? { display: 'none' } : {}}
            required
          />
          <Box className={styles.buttonContainer}>
            <Button variant="contained" color="success" type="submit">
              Отправить
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ContactFormModal;