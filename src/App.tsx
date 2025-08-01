import './app.css';
import { useEffect, useState } from 'react';
import type { Player } from './types';
import { getPlayers, updatePlayers } from './api';
import { Button, CircularProgress } from '@mui/material';
import { PlayerInfo } from './components/PlayerInfo';
import { AdvanceDialog } from './components/AdvanceDialog';

function App() {
  const [displayAdvanceDialog, setDisplayAdvanceDialog] = useState(false);
  const [players, setPlayers] = useState<Player[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const handleToggleReady = async (player: Player) => {
    const updatedPlayers = [...players!];
    const newPlayer = updatedPlayers.find((p) => p.id === player.id)!;
    newPlayer.ready = !newPlayer?.ready;
    const res = await updatePlayers(updatedPlayers);
    setPlayers(res);
  };

  const handlePromptAdvanceDialog = () => {
    setDisplayAdvanceDialog(true);
  };

  const handleAdvanceWeek = async (confirmed: boolean) => {
    setDisplayAdvanceDialog(false);
    if (confirmed) {
      const updatedPlayers = [...players!];
      updatedPlayers.forEach((player) => (player.ready = false));
      setLoading(true);
      const res = await updatePlayers(updatedPlayers);
      setPlayers(res);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-container">
          <CircularProgress size="6rem" />
        </div>
      )}
      {!loading && (
        <div className="player-list">
          {players &&
            players
              .sort((a, b) => (a.ready && !b.ready ? 1 : -1))
              .map((player) => {
                return (
                  <PlayerInfo key={player.id} player={player} onToggleReady={handleToggleReady} />
                );
              })}
          <AdvanceDialog open={displayAdvanceDialog} onClose={handleAdvanceWeek} />
          <div style={{ flex: '1 1 auto' }} />
          <Button
            className="advance-btn"
            variant="contained"
            color="warning"
            onClick={() => handlePromptAdvanceDialog()}
          >
            Advance Week
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
