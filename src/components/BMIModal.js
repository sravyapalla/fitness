import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';

const RAPID_KEY =
  process.env.REACT_APP_RAPIDAPI_KEY ||
  '93b0daaf2cmshbc31d90c28d3a53p1f1a5bjsn80690b2e1793';

const headers = {
  'x-rapidapi-key': RAPID_KEY,
  'x-rapidapi-host': 'body-mass-index-bmi-calculator.p.rapidapi.com',
};

export default function BMIModal({ open, onClose }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState(''); // cm or m
  const [loading, setLoading] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const heightMeters = useMemo(() => {
    const h = parseFloat(height);
    if (!h || Number.isNaN(h)) return NaN;
    return h > 3 ? h / 100 : h; // treat values >3 as cm
  }, [height]);

  const healthyRange = useMemo(() => {
    if (!heightMeters || Number.isNaN(heightMeters)) return null;
    const min = 18.5 * heightMeters * heightMeters;
    const max = 24.9 * heightMeters * heightMeters;
    return {
      min: Math.round(min * 10) / 10,
      max: Math.round(max * 10) / 10,
    };
  }, [heightMeters]);

  async function handleCalculate() {
    if (!weight || !height || Number.isNaN(heightMeters) || heightMeters <= 0) return;

    setLoading(true);
    try {
      // Compute BMI locally to avoid depending on response shape
      const computed = parseFloat(
        (parseFloat(weight) / (heightMeters * heightMeters)).toFixed(1)
      );
      setBmi(computed);

      // Ask RapidAPI for the category; fall back to standard thresholds
      let cat = '';
      try {
        const res = await fetch(
          `https://body-mass-index-bmi-calculator.p.rapidapi.com/weight-category?bmi=${computed}`,
          { method: 'GET', headers }
        );
        const data = await res.json().catch(() => ({}));
        cat = typeof data === 'string' ? data : data?.weightCategory || '';
      } catch {
        /* ignore and fall back */
      }

      if (!cat) {
        if (computed < 18.5) cat = 'Underweight';
        else if (computed < 25) cat = 'Normal weight';
        else if (computed < 30) cat = 'Overweight';
        else cat = 'Obese';
      }
      setCategory(cat);
    } finally {
      setLoading(false);
    }
  }

  function resetAndClose() {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    onClose?.();
  }

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      maxWidth="xs"
      fullWidth
      BackdropProps={{ sx: { backdropFilter: 'blur(4px)' } }} // blur background
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle>Body Mass Index (BMI)</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            inputProps={{ min: 0, step: 'any' }}
          />
          <TextField
            label="Height (cm or m)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            helperText="Example: 175 (cm) or 1.75 (m)"
            fullWidth
            inputProps={{ min: 0, step: 'any' }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Button onClick={resetAndClose}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#FF2625', '&:hover': { bgcolor: '#e02421' } }}
              disabled={loading || !weight || !height}
              onClick={handleCalculate}
            >
              {loading ? 'Calculating…' : 'Calculate'}
            </Button>
          </Stack>

          {bmi && (
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">
                <b>BMI:</b> {bmi}
              </Typography>
              <Typography variant="subtitle1">
                <b>Category:</b> {category}
              </Typography>
              {healthyRange && (
                <Typography variant="subtitle2" color="text.secondary">
                  Healthy weight range for your height: {healthyRange.min}–{healthyRange.max} kg
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
