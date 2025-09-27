import type { Player } from '../types';
import { teamData } from '../data/teamData';

interface PlayerInfoProps {
  onToggleReady: (player: Player) => void;
  player: Player;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, onToggleReady }) => {
  const team = teamData.find((team) => team.id === player.teamId);

  const className = [
    'player-info',
    player.ready ? 'player-info-ready' : 'player-info-not-ready',
  ].join(' ');

  return (
    <div className={className} role="button" onClick={() => onToggleReady(player)}>
      <img className="team-logo" src={team?.logoDark} />

      <div>
        <div className="player-info-contact-gamertag">{player.gamerTag}</div>
      </div>
      <div className="player-info-contact">
        <div className="player-info-contact-name">{player.name}</div>
        <div className="player-info-contact-school">{team?.school}</div>
      </div>
    </div>
  );
};
