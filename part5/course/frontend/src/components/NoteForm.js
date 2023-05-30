import { Notification } from './Notification';

const NoteForm = ({ onSubmit, successMessage, onChange }) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '.5rem' }}>
      {successMessage && <Notification message={successMessage} success={true} />}
      <input type="text" placeholder="new note here..." onChange={onChange} />
      <button type="submit">save</button>
    </form>
  );
};

export { NoteForm };
