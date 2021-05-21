import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    width:'250px',
    color:'#e2ceb5',
    backgroundColor:'rgb(0, 0, 0, 0.85)',
  },
}));

export default function MouseOverPopover({like, userFounded, userLogged}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <p aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
            {userLogged && userFounded && like.usersLiked.length <= 2
                    ? `You and ${like.usersLiked[0].firstName} like this!` 
                    : null}
            {userLogged && userFounded && like.usersLiked.length > 2
                    ? `You, ${like.usersLiked[0].firstName} and ${like.usersLiked.length -2} more like this!` 
                    : null}
            {like.usersLiked.length === 1 &&` ${like.usersLiked[0].firstName} like this!`}
            {!userFounded && like.usersLiked.length > 1 && `${like.usersLiked[0].firstName} and ${like.usersLiked.length -1} more like this!`}
            {like.usersLiked.length === 0 && "Nobody like this yet, be the first!"}
      </p>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {like.usersLiked.map(user => {
            return  <div key={user.userId} className="divPopover">
                        <div className="commentProfileImg" style={{backgroundImage: `url('${user.img}')`}}/>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
        })}
      </Popover>
    </div>
  );
}