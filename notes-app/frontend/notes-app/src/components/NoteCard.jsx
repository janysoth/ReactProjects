import moment from "moment";
import PropTypes from "prop-types";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">
            {title}
          </h6>

          <span className="text-xs text-slate-500">
            {moment(date).format("MMM Do, YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}
          onClick={onPinNote} />
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map(tag => `#${tag} `)}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPinNote: PropTypes.func,
};

export default NoteCard;