import type { NotifyUser } from '../types';

interface PlayerInfoProps {
  onToggleReady: (player: NotifyUser) => void;
  player: NotifyUser;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, onToggleReady }) => {
  return (
    <div role="button" onClick={() => onToggleReady(player)}>
      {player.name}
    </div>
  );
};
