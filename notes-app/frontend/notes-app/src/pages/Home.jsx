import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom";
import AddNotesImg from '../assets/images/add-notes.svg';
import NoNotesImg from '../assets/images/no-notes.svg';
import EmptyCard from "../components/EmptyCard";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import Toast from "../components/Toast";
import axiosInstance from "../utils/axiosInstance";
import AddEditNotes from "./AddEditNotes";

// Set the app element for accessibility
Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleShowToastMsg = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user)
        setUserInfo(response.data.user);
      else
        console.error("Unexpected response structure:", response.data);

    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Failed to fetch user info:", error);
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes)
        setAllNotes(response.data.notes);
    } catch (error) {
      console.log("An unexpected error occurred. Please try again. ", error);
    }
  };

  // Delete Note
  const deleteNote = async (note) => {
    const noteId = note._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        handleShowToastMsg("Note Delete Successfully.", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        console.log("An unexpected error occurred. Please try again. ", error);
    }
  };

  // Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error in Searching Note: ", error);
    }
  };

  // Update isPinned 
  const updateIsPinned = async (note) => {
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + note._id, {
        isPinned: !note.isPinned
      });

      if (response.data && response.data.note && response.data.note.isPinned) {
        handleShowToastMsg("Note Pinned Successfully.");
        getAllNotes();
      }

      if (response.data && response.data.note && (response.data.note.isPinned == false)) {
        handleShowToastMsg("Note Unpinned Successfully.", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error in updateIsPinned. ", error);
    }
  };

  // Clear the search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoNotesImg : AddNotesImg}
            message={isSearch ? `Oops! No Notes found matching your search.` : `Start creating your first note! Click the 'Add' button to jot down thoughts, ideas, and reminders. Let's get started!`}
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          handleShowToastMsg={handleShowToastMsg}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;