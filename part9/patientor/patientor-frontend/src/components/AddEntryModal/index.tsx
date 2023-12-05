import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material'
import { EntryWithoutId } from '../../types'
import AddEntryForm from './AddEntryForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: EntryWithoutId) => void
  error?: string
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

export default AddEntryModal
