import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export function Notes() {
  const [note, setNote] = useState([]);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const currentDate = format(new Date(), 'MMMM d, yyyy');

  const [Admin, setAdmin] = useState(false);

useEffect(() => {
  const key = localStorage.getItem("token");
  setAdmin(key === "suryamsp");
}, []);


  const formik = useFormik({
    initialValues: {
      title: '',
      notes: '',
    },
    onSubmit: (values) => {
      if (detail) {
        editNote(values);
      } else {
        addNote(values);
      }
    },
  });

  const addNote = async (note) => {
    try {
      await fetch('https://trip-backend-eight.vercel.app/Add_notes', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const editNote = async (note) => {
    try {
      await fetch(`https://trip-backend-eight.vercel.app/notes/${detail.title}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' },
      });
      setDetail(null); // Reset detail after editing
      window.location.reload();
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const getNote = async () => {
    try {
      const response = await fetch('https://trip-backend-eight.vercel.app/Addnotes');
      const list = await response.json();
      setNote(list);
    } catch (error) {
      console.error('Error fetching Triplist:', error);
    }
  };
  

  useEffect(() => {
    getNote();
  }, []);

  const deleteNote = async (title) => {
    try {
      await fetch(`https://trip-backend-eight.vercel.app/notes/${title}`, {
        method: 'DELETE',
      });
      await getNote();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  

  const handleEditClick = (data) => {
    setDetail(data);
    console.log(data);
    formik.setValues({
      title: data.title,
      notes: data.notes,
    });
  };

  const handleAddClick = () => {
    setDetail(null);
    formik.resetForm();
  };

  return (
    <div style={{ marginTop: '100px' }}>
{Admin && <button
style={{marginLeft:"20px"}}
        type="button"
        className="btn btn-primary font-weight-bold"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
        onClick={handleAddClick} 
      >
        ADD NOTES
      </button>}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div onSubmit={formik.handleSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {detail ? 'Edit Note' : 'New Note'} {/* Change title based on whether editing or adding */}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    className="form-control"
                    name="notes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.notes}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {detail ? 'Save Changes' : 'Add Note'} {/* Change button text based on whether editing or adding */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        {note &&
          note.map((data, index) => (
            <div key={index} className="cardStyles">
              <div className="titleStyles">{data.title}</div>
              <div className="contentStyles">
                <p>{currentDate}</p>
                {data.notes}
              </div>
              <div className="like_btn_div">
          {Admin &&  <div>
                  <IconButton style={{ color: 'blue' }} data-toggle="modal" 
                  data-target="#exampleModal"
                  onClick={() => handleEditClick(data)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ marginLeft: 'auto' }} color="error" onClick={() => deleteNote(data.title)}>
                    <DeleteIcon />
                  </IconButton>
                </div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
