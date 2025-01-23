import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import EnhancedTable from '../../ui/AdminTable/AdminTable';
import EnhancedTable2 from '../../ui/FeedbackTable/FeedbackTable';
import AdminButton from '../../ui/AdminButton/AdminButton';
import AddForm from '../../ui/AddForm/addForm';
import useBuildings from '../../../hooks/useBuildings';
import useFeedback from '../../../hooks/useFeedback';
import useAppatments from '../../../hooks/useAppartment';
import AddApartmentModal from '../../ui/AddApartmentModal/AddApartmentModal';
import UpdateModal from '../../ui/UpdateModal/UpdateModal';
import UpdateFeedBackModal from '../../ui/UpdateFeedBackModal/UpdateFeedBackModal';
import styles from './AdminPage.module.css';

export default function AdminPage(): React.JSX.Element {
  const { buildings } = useBuildings();
  const { appartments } = useAppatments();
  const { feedbacks } = useFeedback();

  const [openBU, setOpenBu] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const toggleBuild = (id: number) => setOpenBu((prev) => (prev === id ? null : id));

  useEffect(() => {
    if (showFeedback) feedbacks;
  }, [showFeedback, feedbacks]);

  return (
    <Box className={styles.container}>
      <Box className={styles.sidebar}>
        <Button
          className={styles.addButton}
          variant="outlined"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Закрыть' : 'Добавить'}
        </Button>

        {buildings.slice(1).map((build) => (
          <div key={build.id} onClick={() => toggleBuild(build.id)}>
            <AdminButton build={build} />
          </div>
        ))}

        <Button
          className={styles.feedbackButton}
          onClick={() => setShowFeedback(!showFeedback)}
        >
          Обратная связь
        </Button>
      </Box>

      <Box className={styles.content}>
        <AddApartmentModal open={showAdd} onClose={() => setShowAdd(false)} />

        {buildings.map((build) =>
          openBU === build.id ? (
            <div key={build.id}>
              <EnhancedTable appartments={appartments.filter((appart) => appart.buildingId === build.id)} />
            </div>
          ) : null
        )}
        {showFeedback && <EnhancedTable2  feedbacks={feedbacks} />}
      </Box>
      <Box sx={{margin: '44px 0 0 20px'}}>  <AddForm /></Box>
      <UpdateModal />
      <UpdateFeedBackModal />
    </Box>
  );
}
