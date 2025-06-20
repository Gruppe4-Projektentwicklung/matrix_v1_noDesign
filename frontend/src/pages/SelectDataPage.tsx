import React, { useEffect } from 'react';
import { CollectionSelectorIdeas } from '../components/CollectionSelectorIdeas';
import { CollectionSelectorKombis } from '../components/CollectionSelectorKombis';
import { useNavigate } from 'react-router-dom';
import { ResetButton } from '../components/ResetButton';
import { useTranslation } from 'react-i18next';
import { hasSessionStarted, getSessionId, setPageStatus } from '../utils/session';
import { logEvent } from '../api/logEvent';
import { Box, Button, Typography, Paper } from '@mui/material';

interface Props {
  aktuelleIdeensammlung: string;
  aktuelleKombiSammlung: string;
  onIdeenSammlungChange: (name: string) => void;
  onKombiSammlungChange: (name: string) => void;
  onIdeenUpload: (file: File) => void;
  onKombiUpload: (file: File) => void;
}

export const SelectDataPage = ({
  aktuelleIdeensammlung,
  aktuelleKombiSammlung,
  onIdeenSammlungChange,
  onKombiSammlungChange,
  onIdeenUpload,
  onKombiUpload,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasSessionStarted()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleNext = () => {
    logEvent(getSessionId(), 'select-data', {
      ideenSammlung: aktuelleIdeensammlung,
      kombiSammlung: aktuelleKombiSammlung,
    });
    setPageStatus('select-data', 'ok');
    navigate('/ideas');
  };

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ResetButton />
        <Button variant="contained" onClick={handleNext}>
          {t('next')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={handleNext}>
          {t('next')}
        </Button>
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        {t('masterDataSelectionTitle')}
      </Typography>

      <CollectionSelectorIdeas
        aktuelleSammlungName={aktuelleIdeensammlung}
        onSammlungChange={onIdeenSammlungChange}
        onUpload={onIdeenUpload}
      />

      <CollectionSelectorKombis
        aktuelleSammlungName={aktuelleKombiSammlung}
        onSammlungChange={onKombiSammlungChange}
        onUpload={onKombiUpload}
      />

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          backgroundColor: '#f8fafc',
        }}
      >
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
          {t('selectDataInfo')}
        </Typography>
      </Paper>
    </Box>
  );
};
