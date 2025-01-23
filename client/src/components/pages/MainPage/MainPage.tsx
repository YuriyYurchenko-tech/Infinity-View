import React, { useRef, useState }  from 'react';
import type { ChangeEvent, FormEvent} from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Typography, Button, TextField, Paper, Grid, CardMedia } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { ThemeProvider } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import useFeedback from '../../../hooks/useFeedback';
import theme from '../../../theme';
import styles from './MainPage.module.css';

export default function MainPage(): React.JSX.Element {

  const images = [
    {
      src: 'https://sun9-30.userapi.com/impg/dCP68CAKdKabIGcfFsL4FwLqTYOtLJil-jIhbQ/W9dmlgY1_1Y.jpg?size=2560x1440&quality=96&sign=07bdb105f97d6419390860ae71c37824&type=album',
      alt: 'Описание картинки 1',
    },
    {
      src: 'https://sun9-60.userapi.com/impg/w8jcMGBbF3mnmIE3gM_yRSH1NmiUF-9KeKVBtg/V2H7N7Vkwss.jpg?size=2560x1440&quality=96&sign=77e542cfe5a9999babb0ff721b3251eb&type=album',
      alt: 'Описание картинки 2',
    },
    {
      src: 'https://sun9-13.userapi.com/impg/nj6rOFI0bFP2_-gKwboH8U9C85x37xuIcdhWJA/TOdOAVBLvso.jpg?size=2560x1440&quality=96&sign=51e2c9be7083eceb0b7cbd9227f2a532&type=album',
      alt: 'Описание картинки 3',
    },
  ];

  const feedbackFormRef = useRef<HTMLDivElement | null>(null);
  const futureTextRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { submitHandler } = useFeedback();
  const navigate = useNavigate();

  const scrollToFeedbackForm = () => {
    feedbackFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFutureText = () => {
    futureTextRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler(e);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.carousel}>
        <Box className={styles.carouselBackground} />
        <Box className={styles.carouselOverlay} />
        <Box className={styles.centeredText}>
          <Typography variant="h1" className={styles.title}>
            Infinity View
          </Typography>
          <Typography variant="h6" className={styles.subtitle}>
            ЖИЛОЙ КОМПЛЕКС
          </Typography>
          <Box className={styles.scrollContainer}>
            <ArrowDownwardIcon
              className={styles.arrowIcon}
              onClick={scrollToFutureText}
            />
            <Button
              className={styles.learnMoreButton}
              onClick={scrollToFutureText}
            >
              УЗНАТЬ БОЛЬШЕ
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className={styles.infoContainer}>
        <Box className={styles.infoSection}>
          <Box ref={futureTextRef} className={styles.infoText}>
            <Typography variant="h3" className={styles.infoTextTitle}>
              СОЗДАВАЯ БУДУЩЕЕ: INFINITY VIEW
            </Typography>
            <Typography variant="h6" className={styles.descriptionText}>
              СК "Гарантстрой" - один из ведущих застройщиков региона, который за 15 лет работы
              успешно зарекомендовал себя на рынке недвижимости. В своей работе мы стремимся к
              созданию уникальных архитектурных решений, которые не только придают изящество
              строительству, но и способствуют улучшению городской среды. Наша команда постоянно
              исследует и внедряет новые архитектурные идеи, чтобы каждый проект обрел свою
              индивидуальность. Такие дома как "Эсфера Сити" вовсе изменили облик всего района, а ЖК
              "Адения" в своё время задала новый тренд среди застройщиков и многие использовали
              похожий архитектурный стиль в своих проектах.
              <br />
              <br />
              Не стал исключением и новый проект от нашей компании - жилой комплекс "Infinity View".
            </Typography>
          </Box>
          <Box className={styles.carouselWrapper}>
            <Carousel
              animation="slide"
              interval={6000}
              indicators={false}
              className={styles.carouselInner}
            >
              {images.map((item) => (
                <Paper key={item.alt} className={styles.carouselImageWrapper}>
                  <img src={item.src} alt={item.alt} className={styles.carouselImage} />
                </Paper>
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box className={styles.buttonSection}>
          <Box className={styles.buttonContainer}>
            <Button className={styles.primaryButton} onClick={() => navigate('/apartments')}>
              Выбрать квартиру
            </Button>
            <Button className={styles.outlinedButton} onClick={scrollToFeedbackForm}>
              Получить консультацию
            </Button>
          </Box>
        </Box>
        <Box className={styles.infoSecondSection}>
          <Box className={styles.imageWrapper}>
            <CardMedia
              component="img"
              image="https://sun9-37.userapi.com/impg/XWOE7tGm7E8mRgD8R8mu5PvkifoBouayJAIKNw/_cAUuntVi_A.jpg?size=2560x1440&quality=96&sign=f90297b9f6f2d14e24d35fcb8178d37e&type=album"
              alt="Paella dish"
              className={styles.cardMedia}
            />
          </Box>
          <Box className={styles.infoTextSecond}>
            <Typography variant="h3" className={styles.infoTextTitle}>
              ПОЧЕМУ INFINITY VIEW?
            </Typography>
            <Typography variant="h6" className={styles.descriptionText}>
              Просторные дворы в ширину более 100 м, собственная инфраструктура и современный
              архитектурный стиль делает этот комплекс выгодным как для инвестиций так и для
              проживания.
              <br />
              <br />
              Благодаря расположению ЖК "Infinity View" из окон открывается красивый вид практически
              в любую сторону, в том числе и на Кавказский хребет. В радиусе 500 м расположены
              несколько общеобразовательных школ и детских садов, крупная транспортная развязка, и
              множество магазинов.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box ref={feedbackFormRef} className={styles.formContainer}>
      <Paper elevation={3} className={styles.feedbackForm}>
        <Grid className={styles.formGrid}>
        
          <Grid item xs={12} md={6} className={styles.leftSideText}>
            <Typography variant="h4" className={styles.formTitle}>
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </Typography>
            <Typography variant="h6" className={styles.formDescription}>
              Закажите звонок и получите профессиональную консультацию от нашего специалиста или напишите нам
            </Typography>
            <Box>
            <a href="tel:+79287233353" style={{ marginRight: '15px' }} aria-label="Позвонить нам" className={styles.iconLink}>
              <PhoneInTalkIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com/garantstroy_kbr" target="_blank" rel="noopener noreferrer" aria-label="Открыть профиль в Instagram в новой вкладке" className={styles.iconLink}>
              <InstagramIcon fontSize="large" />
            </a>
            </Box>
            <br></br>
            <img
            className={styles.imgForm}
              src="http://localhost:3000/img/Form_img.png"
              alt="Grapefruit slice atop a pile of other slices" />
          </Grid>

            <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
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
                  inputProps={{ pattern: '(.*)@(.*)\\.[a-z]{2,5}' }}
                  onInvalid={(e: FormEvent<HTMLDivElement>) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('Пожалуйста, введите email');
                  }}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity('');
                  }}
                  name="email"
                  label="Ваш email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />{' '}
                <ReactPhoneInput
                  inputStyle={{ padding: '0' }}
                  country="ru"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  component={TextField}
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
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={styles.submitButton}
                  type="submit"
                >
                  Заказать звонок
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
