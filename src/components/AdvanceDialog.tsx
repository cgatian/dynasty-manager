import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface AdvanceDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export const AdvanceDialog: React.FC<AdvanceDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle id="alert-dialog-title">Advance?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Advancing the week sets everyones status back to not ready.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} autoFocus>
          Whoopsie I fucked up
        </Button>
        <Button onClick={() => onClose(true)} variant="contained" color="success">
          Advance!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
