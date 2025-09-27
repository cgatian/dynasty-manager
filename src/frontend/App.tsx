import './app.css';
import { useState } from 'react';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { sendNotifications } from './api';

function App() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | undefined>();

  const handleSend = async () => {
    try {
      setIsSending(true);
      setStatus('idle');
      setMessage(undefined);
      await sendNotifications([-1]);
      setStatus('success');
      setMessage('Notification sent!');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Failed to send notification. Check the backend logs.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="app-shell">
      <Typography variant="h4" component="h1">
        Dynasty Notification Test
      </Typography>
      <Typography variant="body1" component="p" className="app-subtitle">
        Click the button below to call the backend with <code>userIds = [-1]</code>.
      </Typography>
      <Button
        className="notify-btn"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSending}
        onClick={handleSend}
      >
        {isSending ? 'Sending…' : 'Send Test Notification'}
      </Button>
      {isSending && <CircularProgress size="2rem" />}
      {status !== 'idle' && message && (
        <Alert
          className="notify-alert"
          severity={status === 'success' ? 'success' : 'error'}
          onClose={() => {
            setStatus('idle');
            setMessage(undefined);
          }}
        >
          {message}
        </Alert>
      )}
    </div>
  );
}

export default App;
